export type CollageCell = {
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
};
export declare const MEAL_COLLAGE_CANVAS = 800;
/** Safety cap for remote image fetches when building a collage. */
export declare const MEAL_COLLAGE_MAX_SOURCES = 100;
export type MealImageSource = "user" | "collage";
export type MealImageKind = "user" | "auto";
/**
 * Collect product image URLs in product order, skipping empties and deduping.
 */
export declare function collectMealProductImageUrls(products: ReadonlyArray<{
    productImage?: string | null;
}>, options?: {
    dedupe?: boolean;
    maxSources?: number;
}): string[];
/**
 * Compute mosaic cell rectangles for a meal collage.
 * Uses a square canvas by default (server bitmap); pass width/height for UI preview.
 */
export declare function computeMealCollageLayout(count: number, canvasWidth?: number, canvasHeight?: number): CollageCell[];
/**
 * Infer whether a legacy meal cover (imageSource null) was a user photo or
 * the old first-product auto-fill.
 */
export declare function inferLegacyMealImageSource(meal: {
    image?: string | null;
    imageSource?: "user" | "collage" | null;
    products?: ReadonlyArray<{
        productImage?: string | null;
    }>;
}): MealImageSource;
//# sourceMappingURL=mealCollageLayout.d.ts.map