export type ActivityLevel = "sedentary" | "lightly_active" | "moderately_active" | "very_active" | "extra_active";
export type Gender = "male" | "female" | "other";
export type WeightGoal = "lose" | "maintain" | "gain";
export type HeightUnit = "cm" | "ft";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type FoodUnit = "gram" | "ml" | "portion" | "custom" | "g" | "kg" | "l" | "unit";
export declare enum WeightUnit {
    KG = "kg",
    LBS = "lbs"
}
export interface UserAnthropometrics {
    weight: number;
    height: number;
    age: number;
    gender: Gender;
    activityLevel: ActivityLevel;
}
export interface UserGoals {
    weightGoal: WeightGoal;
    targetWeight: number;
    weeklyWeightChange: number;
}
export interface UserMacroGoals {
    dailyCalories: number;
    protein: number;
    carbs: number;
    fat: number;
}
export interface UserPreferences {
    weightUnit: WeightUnit;
    heightUnit: HeightUnit;
}
export interface CreateUserNutritionProfileRequest {
    userId: string;
    anthropometrics: UserAnthropometrics;
    goals: UserGoals;
    macroGoals: UserMacroGoals;
    preferences: UserPreferences;
}
export interface UpdateUserNutritionProfileRequest {
    anthropometrics?: UserAnthropometrics;
    goals?: UserGoals;
    macroGoals?: UserMacroGoals;
    preferences?: UserPreferences;
}
export interface UpdateMacroGoalsRequest {
    dailyCalories: number;
    protein: number;
    carbs: number;
    fat: number;
}
export interface UserNutritionProfileResponse {
    id: string;
    userId: string;
    anthropometrics: UserAnthropometrics;
    goals: UserGoals;
    macroGoals: UserMacroGoals;
    preferences: UserPreferences;
    createdAt: string | Date;
    updatedAt: string | Date;
}
export interface CreateFoodEntryRequest {
    userId: string;
    productCode: string;
    productName: string;
    productImage?: string;
    date: string;
    mealType: MealType;
    quantity: number;
    unit: FoodUnit;
    customUnitName?: string;
    customUnitGrams?: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar?: number;
    fiber?: number;
    sodium?: number;
}
export interface UpdateFoodEntryRequest {
    userId?: string;
    quantity?: number;
    unit?: FoodUnit;
    customUnitName?: string;
    customUnitGrams?: number;
    mealType?: MealType;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    sugar?: number;
    fiber?: number;
    sodium?: number;
}
export interface FoodEntryResponse {
    id: string;
    userId: string;
    productCode: string;
    productName: string;
    productImage?: string;
    date: string;
    mealType: MealType;
    quantity: number;
    unit: FoodUnit;
    customUnitName?: string;
    customUnitGrams?: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar?: number;
    fiber?: number;
    sodium?: number;
    createdAt: string | Date;
}
export interface DailyNutritionSummary {
    date: string;
    entries: FoodEntryResponse[];
    totals: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        sugar: number;
        fiber: number;
        sodium: number;
    };
    goals: {
        dailyCalories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
    hasProfile: boolean;
}
export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}
export interface ChatRequest {
    text: string;
    history?: ChatMessage[];
    userId?: string;
}
export interface ChatResponse {
    reply: string;
    provider: string;
    model: string;
}
export interface RecognizeFoodResponse {
    name: string;
    calories?: number | null;
    proteins?: number | null;
    carbs?: number | null;
    fats?: number | null;
    servingSize?: number | null;
}
export interface MealProduct {
    productCode: string;
    productName: string;
    quantity: number;
    unit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar?: number | null;
    fiber?: number | null;
    sodium?: number | null;
    isCustom?: boolean;
}
export interface CreateCustomProductRequest {
    userId: string;
    name: string;
    description?: string;
    image?: string;
    brand?: string;
    caloriesPer100: number;
    proteinPer100: number;
    carbsPer100: number;
    fatPer100: number;
    fiberPer100?: number;
    sugarPer100?: number;
    sodiumPer100?: number;
    servingSize?: number;
    servingUnit?: string;
    barcode?: string;
}
export interface UpdateCustomProductRequest {
    userId?: string;
    name?: string;
    description?: string;
    image?: string;
    brand?: string;
    caloriesPer100?: number;
    proteinPer100?: number;
    carbsPer100?: number;
    fatPer100?: number;
    fiberPer100?: number;
    sugarPer100?: number;
    sodiumPer100?: number;
    servingSize?: number;
    servingUnit?: string;
    barcode?: string;
}
export interface CustomProductResponse extends CreateCustomProductRequest {
    id: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}
export interface CreateCustomMealRequest {
    userId: string;
    name: string;
    description?: string;
    image?: string;
    products: MealProduct[];
}
export interface UpdateCustomMealRequest {
    userId?: string;
    name?: string;
    description?: string;
    image?: string;
    products?: MealProduct[];
}
export interface CustomMealResponse {
    id: string;
    userId: string;
    name: string;
    description?: string;
    image?: string;
    products: MealProduct[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalSugar?: number | null;
    totalFiber?: number | null;
    totalSodium?: number | null;
    createdAt: string | Date;
    updatedAt: string | Date;
}
export interface FavoriteProductResponse {
    id: string;
    userId: string;
    productCode: string;
    productName: string;
    productImage?: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    createdAt: string | Date;
}
export interface ShoppingListItem {
    id: string;
    userId: string;
    productCode: string;
    productName: string;
    productImage?: string;
    quantity: number;
    unit: FoodUnit;
    customUnitName?: string;
    customUnitGrams?: number;
    purchased: boolean;
    createdAt: string | Date;
    updatedAt?: string | Date;
}
export interface MappedNutrient {
    label: string;
    value: number | string | undefined | null;
}
export interface MappedProduct {
    code: string;
    name: string;
    brand: string | null;
    image: string | null;
    categories: string | null;
    nutritionGrade: string | null;
    servingSize?: string | null;
    grams: number;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
    fiber: number | null;
    sugar: number | null;
    sodium: number | null;
    saturatedFat?: number | null;
    others: MappedNutrient[];
}
export type UserNutritionProfileResponseDto = UserNutritionProfileResponse;
export type CreateUserNutritionProfileDto = CreateUserNutritionProfileRequest;
export type UpdateUserNutritionProfileDto = UpdateUserNutritionProfileRequest;
export type UpdateMacroGoalsDto = UpdateMacroGoalsRequest;
export type CreateFoodEntryDto = CreateFoodEntryRequest;
export type UpdateFoodEntryDto = UpdateFoodEntryRequest;
export type FoodEntryResponseDto = FoodEntryResponse;
export type DailyNutritionSummaryDto = DailyNutritionSummary;
export type ChatMessageDto = ChatMessage;
export type ChatRequestDto = ChatRequest;
export type ChatResponseDto = ChatResponse;
export type RecognizeFoodResponseDto = RecognizeFoodResponse;
export type MealProductDto = MealProduct;
export type CreateCustomProductDto = CreateCustomProductRequest;
export type UpdateCustomProductDto = UpdateCustomProductRequest;
export type CustomProductResponseDto = CustomProductResponse;
export type CreateCustomMealDto = CreateCustomMealRequest;
export type UpdateCustomMealDto = UpdateCustomMealRequest;
export type CustomMealResponseDto = CustomMealResponse;
export type FavoriteProductResponseDto = FavoriteProductResponse;
export type ShoppingListItemResponseDto = ShoppingListItem;
export type MappedProductDto = MappedProduct;
//# sourceMappingURL=nutrition.d.ts.map