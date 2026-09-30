"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEAL_COLLAGE_MAX_SOURCES = exports.MEAL_COLLAGE_CANVAS = void 0;
exports.collectMealProductImageUrls = collectMealProductImageUrls;
exports.computeMealCollageLayout = computeMealCollageLayout;
exports.inferLegacyMealImageSource = inferLegacyMealImageSource;
exports.MEAL_COLLAGE_CANVAS = 800;
/** Safety cap for remote image fetches when building a collage. */
exports.MEAL_COLLAGE_MAX_SOURCES = 100;
/**
 * Collect product image URLs in product order, skipping empties and deduping.
 */
function collectMealProductImageUrls(products, options) {
    var _a, _b;
    const dedupe = (options === null || options === void 0 ? void 0 : options.dedupe) !== false;
    const maxSources = (_a = options === null || options === void 0 ? void 0 : options.maxSources) !== null && _a !== void 0 ? _a : exports.MEAL_COLLAGE_MAX_SOURCES;
    const seen = new Set();
    const urls = [];
    for (const product of products) {
        const raw = (_b = product.productImage) === null || _b === void 0 ? void 0 : _b.trim();
        if (!raw)
            continue;
        if (dedupe && seen.has(raw))
            continue;
        if (dedupe)
            seen.add(raw);
        urls.push(raw);
        if (urls.length >= maxSources)
            break;
    }
    return urls;
}
/**
 * Compute mosaic cell rectangles for a meal collage.
 * Uses a square canvas by default (server bitmap); pass width/height for UI preview.
 */
function computeMealCollageLayout(count, canvasWidth = exports.MEAL_COLLAGE_CANVAS, canvasHeight = canvasWidth) {
    if (count <= 0)
        return [];
    const w = canvasWidth;
    const h = canvasHeight;
    if (count === 1) {
        return [{ x: 0, y: 0, width: w, height: h, index: 0 }];
    }
    if (count === 2) {
        const half = w / 2;
        return [
            { x: 0, y: 0, width: half, height: h, index: 0 },
            { x: half, y: 0, width: half, height: h, index: 1 },
        ];
    }
    if (count === 3) {
        const halfW = w / 2;
        const halfH = h / 2;
        return [
            { x: 0, y: 0, width: halfW, height: h, index: 0 },
            { x: halfW, y: 0, width: halfW, height: halfH, index: 1 },
            { x: halfW, y: halfH, width: halfW, height: halfH, index: 2 },
        ];
    }
    if (count === 4) {
        const halfW = w / 2;
        const halfH = h / 2;
        return [
            { x: 0, y: 0, width: halfW, height: halfH, index: 0 },
            { x: halfW, y: 0, width: halfW, height: halfH, index: 1 },
            { x: 0, y: halfH, width: halfW, height: halfH, index: 2 },
            { x: halfW, y: halfH, width: halfW, height: halfH, index: 3 },
        ];
    }
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const cellW = w / cols;
    const cellH = h / rows;
    const cells = [];
    for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        cells.push({
            x: col * cellW,
            y: row * cellH,
            width: cellW,
            height: cellH,
            index: i,
        });
    }
    return cells;
}
/**
 * Infer whether a legacy meal cover (imageSource null) was a user photo or
 * the old first-product auto-fill.
 */
function inferLegacyMealImageSource(meal) {
    var _a;
    if (meal.imageSource === "user" || meal.imageSource === "collage") {
        return meal.imageSource;
    }
    if (!meal.image)
        return "collage";
    const urls = collectMealProductImageUrls((_a = meal.products) !== null && _a !== void 0 ? _a : [], {
        maxSources: exports.MEAL_COLLAGE_MAX_SOURCES,
    });
    if (urls.length > 0 && meal.image === urls[0]) {
        return "collage";
    }
    return "user";
}
