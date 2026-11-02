import type { ProductServingMeasure } from "./nutrition";
export type UsdaFoodPortionInput = {
    id?: number;
    amount?: number | null;
    gramWeight?: number | null;
    portionDescription?: string | null;
    modifier?: string | null;
    sequenceNumber?: number | null;
    measureUnit?: {
        name?: string | null;
        abbreviation?: string | null;
    } | null;
};
export declare function isLikelyLiquidProduct(categories?: string | null): boolean;
export declare function formatGramsLabel(grams: number): string;
export declare function buildGramMeasure(grams?: number): ProductServingMeasure;
export declare function buildMlMeasure(): ProductServingMeasure;
/**
 * Parse Open Food Facts / label serving strings like "30 g", "1 banana (118g)", "240 ml".
 */
export declare function parsePackageServing(servingSize?: string | null): ProductServingMeasure | null;
export declare function mapUsdaFoodPortions(portions: UsdaFoodPortionInput[] | null | undefined): ProductServingMeasure[];
export type AssembleServingsInput = {
    servingSize?: string | null;
    categories?: string | null;
    usdaPortions?: UsdaFoodPortionInput[] | null;
    includeMl?: boolean;
};
/**
 * Build the full measure list: household/package first, then g, then ml when relevant.
 */
export declare function assembleProductServings(input: AssembleServingsInput): ProductServingMeasure[];
export declare function pickDefaultServingId(servings: ProductServingMeasure[], options?: {
    categories?: string | null;
}): string;
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
export declare function calculateMacrosForServing(per100: MacrosPer100, quantity: number, measure: ProductServingMeasure): MacrosPer100;
export declare function resolveInitialQuantity(measure: ProductServingMeasure, options?: {
    preferredGrams?: number | null;
}): string;
export declare function parseUsdaCode(code?: string | null): number | null;
//# sourceMappingURL=productServings.d.ts.map