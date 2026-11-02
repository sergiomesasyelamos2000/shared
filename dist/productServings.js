"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLikelyLiquidProduct = isLikelyLiquidProduct;
exports.formatGramsLabel = formatGramsLabel;
exports.buildGramMeasure = buildGramMeasure;
exports.buildMlMeasure = buildMlMeasure;
exports.parsePackageServing = parsePackageServing;
exports.mapUsdaFoodPortions = mapUsdaFoodPortions;
exports.assembleProductServings = assembleProductServings;
exports.pickDefaultServingId = pickDefaultServingId;
exports.calculateMacrosForServing = calculateMacrosForServing;
exports.resolveInitialQuantity = resolveInitialQuantity;
exports.parseUsdaCode = parseUsdaCode;
const LIQUID_CATEGORY_RE = /\b(bebidas?|drinks?|beverages?|juices?|zumos?|leche|milk|aguas?|water|soda|refrescos?|yogur\s*l[ií]quido|smoothie)\b/i;
function isLikelyLiquidProduct(categories) {
    if (!(categories === null || categories === void 0 ? void 0 : categories.trim()))
        return false;
    return LIQUID_CATEGORY_RE.test(categories);
}
function formatGramsLabel(grams) {
    const rounded = Math.round(grams * 10) / 10;
    const text = Number.isInteger(rounded) || Math.abs(rounded - Math.round(rounded)) < 0.05
        ? String(Math.round(rounded))
        : rounded.toFixed(1);
    return `${text} g`;
}
function buildGramMeasure(grams = 100) {
    return {
        id: "gram",
        label: "Gramos",
        grams: 1,
        kind: "gram",
    };
}
function buildMlMeasure() {
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
function parsePackageServing(servingSize) {
    const raw = servingSize === null || servingSize === void 0 ? void 0 : servingSize.trim();
    if (!raw)
        return null;
    const paren = raw.match(/\((\d+(?:[.,]\d+)?)\s*(g|gr|gram(?:o|os)?|ml|mll?)\b/i);
    const direct = raw.match(/(\d+(?:[.,]\d+)?)\s*(g|gr|gram(?:o|os)?|ml|mll?)\b/i);
    const match = paren !== null && paren !== void 0 ? paren : direct;
    if (!match)
        return null;
    const amount = parseFloat(match[1].replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0)
        return null;
    const grams = amount;
    const shortLabel = raw.length > 48 ? `${raw.slice(0, 45)}…` : raw;
    return {
        id: "package",
        label: `${shortLabel} (${formatGramsLabel(grams)})`,
        grams,
        kind: "package",
    };
}
function buildUsdaPortionLabel(portion, grams) {
    var _a, _b, _c, _d, _e, _f;
    const description = (_a = portion.portionDescription) === null || _a === void 0 ? void 0 : _a.trim();
    if (description) {
        return `${description} (${formatGramsLabel(grams)})`;
    }
    const amount = typeof portion.amount === "number" && Number.isFinite(portion.amount)
        ? portion.amount
        : null;
    const unit = ((_c = (_b = portion.measureUnit) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.trim()) ||
        ((_e = (_d = portion.measureUnit) === null || _d === void 0 ? void 0 : _d.abbreviation) === null || _e === void 0 ? void 0 : _e.trim()) ||
        "";
    const modifier = ((_f = portion.modifier) === null || _f === void 0 ? void 0 : _f.trim()) || "";
    const parts = [];
    if (amount != null)
        parts.push(String(amount));
    if (unit)
        parts.push(unit);
    if (modifier && !unit.toLowerCase().includes(modifier.toLowerCase())) {
        parts.push(modifier);
    }
    const base = parts.join(" ").trim() || "Porción";
    return `${base} (${formatGramsLabel(grams)})`;
}
function mapUsdaFoodPortions(portions) {
    var _a;
    if (!(portions === null || portions === void 0 ? void 0 : portions.length))
        return [];
    const sorted = [...portions].sort((a, b) => {
        var _a, _b;
        const sa = (_a = a.sequenceNumber) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
        const sb = (_b = b.sequenceNumber) !== null && _b !== void 0 ? _b : Number.MAX_SAFE_INTEGER;
        return sa - sb;
    });
    const measures = [];
    const seen = new Set();
    for (const portion of sorted) {
        const grams = portion.gramWeight;
        if (typeof grams !== "number" || !Number.isFinite(grams) || grams <= 0) {
            continue;
        }
        const id = `usda-${(_a = portion.id) !== null && _a !== void 0 ? _a : measures.length}-${Math.round(grams * 10)}`;
        if (seen.has(id))
            continue;
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
/**
 * Build the full measure list: household/package first, then g, then ml when relevant.
 */
function assembleProductServings(input) {
    var _a;
    const household = mapUsdaFoodPortions(input.usdaPortions);
    const packageServing = parsePackageServing(input.servingSize);
    const includeMl = (_a = input.includeMl) !== null && _a !== void 0 ? _a : (isLikelyLiquidProduct(input.categories) ||
        (packageServing === null || packageServing === void 0 ? void 0 : packageServing.label.toLowerCase().includes("ml")) === true);
    const measures = [];
    const seen = new Set();
    const push = (measure) => {
        if (seen.has(measure.id))
            return;
        seen.add(measure.id);
        measures.push(measure);
    };
    for (const measure of household)
        push(measure);
    if (packageServing)
        push(packageServing);
    push(buildGramMeasure());
    if (includeMl)
        push(buildMlMeasure());
    return measures;
}
function pickDefaultServingId(servings, options) {
    var _a;
    if (servings.length === 0)
        return "gram";
    const household = servings.filter((s) => s.kind === "household");
    if (household.length > 0) {
        const medium = household.find((s) => /\bmedium\b/i.test(s.label));
        if (medium)
            return medium.id;
        const nlea = household.find((s) => /\bnlea\b/i.test(s.label));
        if (nlea)
            return nlea.id;
        return household[0].id;
    }
    const packageMeasure = servings.find((s) => s.kind === "package");
    if (packageMeasure)
        return packageMeasure.id;
    if (isLikelyLiquidProduct(options === null || options === void 0 ? void 0 : options.categories)) {
        const ml = servings.find((s) => s.kind === "ml");
        if (ml)
            return ml.id;
    }
    const gram = servings.find((s) => s.kind === "gram");
    return (_a = gram === null || gram === void 0 ? void 0 : gram.id) !== null && _a !== void 0 ? _a : servings[0].id;
}
/**
 * Scale per-100g macros by quantity × measure.
 * For gram/ml measures, `quantity` is grams/ml directly (measure.grams === 1).
 * For household/package, `quantity` is number of portions.
 */
function calculateMacrosForServing(per100, quantity, measure) {
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
function resolveInitialQuantity(measure, options) {
    if (measure.kind === "gram" || measure.kind === "ml") {
        const preferred = options === null || options === void 0 ? void 0 : options.preferredGrams;
        if (typeof preferred === "number" && preferred > 0) {
            return String(preferred);
        }
        return "100";
    }
    return "1";
}
function parseUsdaCode(code) {
    var _a;
    const raw = (_a = code === null || code === void 0 ? void 0 : code.trim()) !== null && _a !== void 0 ? _a : "";
    const match = raw.match(/^usda-(\d+)$/i);
    if (!match)
        return null;
    const id = Number(match[1]);
    return Number.isFinite(id) ? id : null;
}
