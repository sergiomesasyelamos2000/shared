import type { ProductServingMeasure } from "./nutrition";

export type UsdaFoodPortionInput = {
  id?: number;
  amount?: number | null;
  gramWeight?: number | null;
  portionDescription?: string | null;
  modifier?: string | null;
  sequenceNumber?: number | null;
  measureUnit?: { name?: string | null; abbreviation?: string | null } | null;
};

const LIQUID_CATEGORY_RE =
  /\b(bebidas?|drinks?|beverages?|juices?|zumos?|leche|milk|aguas?|water|soda|refrescos?|yogur\s*l[ií]quido|smoothie)\b/i;

export function isLikelyLiquidProduct(categories?: string | null): boolean {
  if (!categories?.trim()) return false;
  return LIQUID_CATEGORY_RE.test(categories);
}

export function formatGramsLabel(grams: number): string {
  const rounded = Math.round(grams * 10) / 10;
  const text =
    Number.isInteger(rounded) || Math.abs(rounded - Math.round(rounded)) < 0.05
      ? String(Math.round(rounded))
      : rounded.toFixed(1);
  return `${text} g`;
}

export function buildGramMeasure(grams = 100): ProductServingMeasure {
  return {
    id: "gram",
    label: "Gramos",
    grams: 1,
    kind: "gram",
  };
}

export function buildMlMeasure(): ProductServingMeasure {
  return {
    id: "ml",
    label: "Mililitros",
    grams: 1,
    kind: "ml",
  };
}

/**
 * Parse Open Food Facts / label serving strings like "30 g", "1 banana (118g)", "240 ml".
 */
export function parsePackageServing(
  servingSize?: string | null
): ProductServingMeasure | null {
  const raw = servingSize?.trim();
  if (!raw) return null;

  const paren = raw.match(
    /\((\d+(?:[.,]\d+)?)\s*(g|gr|gram(?:o|os)?|ml|mll?)\b/i
  );
  const direct = raw.match(
    /(\d+(?:[.,]\d+)?)\s*(g|gr|gram(?:o|os)?|ml|mll?)\b/i
  );
  const match = paren ?? direct;
  if (!match) return null;

  const amount = parseFloat(match[1].replace(",", "."));
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const grams = amount;
  const shortLabel = raw.length > 48 ? `${raw.slice(0, 45)}…` : raw;

  return {
    id: "package",
    label: `${shortLabel} (${formatGramsLabel(grams)})`,
    grams,
    kind: "package",
  };
}

function buildUsdaPortionLabel(
  portion: UsdaFoodPortionInput,
  grams: number
): string {
  const description = portion.portionDescription?.trim();
  if (description) {
    return `${description} (${formatGramsLabel(grams)})`;
  }

  const amount =
    typeof portion.amount === "number" && Number.isFinite(portion.amount)
      ? portion.amount
      : null;
  const unit =
    portion.measureUnit?.name?.trim() ||
    portion.measureUnit?.abbreviation?.trim() ||
    "";
  const modifier = portion.modifier?.trim() || "";

  const parts: string[] = [];
  if (amount != null) parts.push(String(amount));
  if (unit) parts.push(unit);
  if (modifier && !unit.toLowerCase().includes(modifier.toLowerCase())) {
    parts.push(modifier);
  }

  const base = parts.join(" ").trim() || "Porción";
  return `${base} (${formatGramsLabel(grams)})`;
}

export function mapUsdaFoodPortions(
  portions: UsdaFoodPortionInput[] | null | undefined
): ProductServingMeasure[] {
  if (!portions?.length) return [];

  const sorted = [...portions].sort((a, b) => {
    const sa = a.sequenceNumber ?? Number.MAX_SAFE_INTEGER;
    const sb = b.sequenceNumber ?? Number.MAX_SAFE_INTEGER;
    return sa - sb;
  });

  const measures: ProductServingMeasure[] = [];
  const seen = new Set<string>();

  for (const portion of sorted) {
    const grams = portion.gramWeight;
    if (typeof grams !== "number" || !Number.isFinite(grams) || grams <= 0) {
      continue;
    }

    const id = `usda-${portion.id ?? measures.length}-${Math.round(grams * 10)}`;
    if (seen.has(id)) continue;
    seen.add(id);

    measures.push({
      id,
      label: buildUsdaPortionLabel(portion, grams),
      grams,
      kind: "household",
    });
  }

  return measures;
}

export type AssembleServingsInput = {
  servingSize?: string | null;
  categories?: string | null;
  usdaPortions?: UsdaFoodPortionInput[] | null;
  includeMl?: boolean;
};

/**
 * Build the full measure list: household/package first, then g, then ml when relevant.
 */
export function assembleProductServings(
  input: AssembleServingsInput
): ProductServingMeasure[] {
  const household = mapUsdaFoodPortions(input.usdaPortions);
  const packageServing = parsePackageServing(input.servingSize);
  const includeMl =
    input.includeMl ??
    (isLikelyLiquidProduct(input.categories) ||
      packageServing?.label.toLowerCase().includes("ml") === true);

  const measures: ProductServingMeasure[] = [];
  const seen = new Set<string>();

  const push = (measure: ProductServingMeasure) => {
    if (seen.has(measure.id)) return;
    seen.add(measure.id);
    measures.push(measure);
  };

  for (const measure of household) push(measure);
  if (packageServing) push(packageServing);
  push(buildGramMeasure());
  if (includeMl) push(buildMlMeasure());

  return measures;
}

export function pickDefaultServingId(
  servings: ProductServingMeasure[],
  options?: { categories?: string | null }
): string {
  if (servings.length === 0) return "gram";

  const household = servings.filter((s) => s.kind === "household");
  if (household.length > 0) {
    const medium = household.find((s) => /\bmedium\b/i.test(s.label));
    if (medium) return medium.id;
    const nlea = household.find((s) => /\bnlea\b/i.test(s.label));
    if (nlea) return nlea.id;
    return household[0].id;
  }

  const packageMeasure = servings.find((s) => s.kind === "package");
  if (packageMeasure) return packageMeasure.id;

  if (isLikelyLiquidProduct(options?.categories)) {
    const ml = servings.find((s) => s.kind === "ml");
    if (ml) return ml.id;
  }

  const gram = servings.find((s) => s.kind === "gram");
  return gram?.id ?? servings[0].id;
}

export type MacrosPer100 = {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
};

/**
 * Scale per-100g macros by quantity × measure.
 * For gram/ml measures, `quantity` is grams/ml directly (measure.grams === 1).
 * For household/package, `quantity` is number of portions.
 */
export function calculateMacrosForServing(
  per100: MacrosPer100,
  quantity: number,
  measure: ProductServingMeasure
): MacrosPer100 {
  const qty = Number.isFinite(quantity) ? quantity : 0;
  if (qty <= 0 || measure.grams <= 0) {
    return { calories: 0, protein: 0, carbohydrates: 0, fat: 0 };
  }

  const totalGrams = qty * measure.grams;
  const factor = totalGrams / 100;

  return {
    calories: Math.round(per100.calories * factor),
    protein: Math.round(per100.protein * factor * 10) / 10,
    carbohydrates: Math.round(per100.carbohydrates * factor * 10) / 10,
    fat: Math.round(per100.fat * factor * 10) / 10,
  };
}

export function resolveInitialQuantity(
  measure: ProductServingMeasure,
  options?: { preferredGrams?: number | null }
): string {
  if (measure.kind === "gram" || measure.kind === "ml") {
    const preferred = options?.preferredGrams;
    if (typeof preferred === "number" && preferred > 0) {
      return String(preferred);
    }
    return "100";
  }
  return "1";
}

export function parseUsdaCode(code?: string | null): number | null {
  const raw = code?.trim() ?? "";
  const match = raw.match(/^usda-(\d+)$/i);
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isFinite(id) ? id : null;
}
