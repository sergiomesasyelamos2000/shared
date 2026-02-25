export declare enum SubscriptionPlan {
    FREE = "free",
    MONTHLY = "monthly",
    YEARLY = "yearly",
    LIFETIME = "lifetime"
}
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    CANCELED = "canceled",
    EXPIRED = "expired",
    PAST_DUE = "past_due",
    INCOMPLETE = "incomplete",
    TRIAL = "trial"
}
export interface Subscription {
    id: string;
    userId: string;
    lemonCustomerId?: string;
    lemonSubscriptionId?: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    currentPeriodStart?: string | Date;
    currentPeriodEnd?: string | Date;
    cancelAtPeriodEnd: boolean;
    canceledAt?: string | Date;
    trialEnd?: string | Date;
    price?: number;
    currency: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}
export interface SubscriptionFeatures {
    maxRoutines: number | null;
    maxCustomProducts: number | null;
    maxCustomMeals: number | null;
    aiAnalysisEnabled: boolean;
    advancedStatsEnabled: boolean;
    exportDataEnabled: boolean;
    prioritySupportEnabled: boolean;
}
export interface SubscriptionStatusResponse {
    subscription: Subscription;
    features: SubscriptionFeatures;
    isPremium: boolean;
    daysRemaining?: number;
}
export interface CreateCheckoutSessionRequest {
    planId: SubscriptionPlan;
    successUrl?: string;
    cancelUrl?: string;
}
export interface VerifyPaymentRequest {
    sessionId: string;
    planId?: SubscriptionPlan;
}
export interface CancelSubscriptionRequest {
    cancelImmediately?: boolean;
    reason?: string;
}
export interface CheckoutSessionResponse {
    sessionId: string;
    checkoutUrl: string;
}
export interface CustomerPortalResponse {
    portalUrl: string;
}
export interface PlanMetadata {
    id: SubscriptionPlan;
    name: string;
    description: string;
    price: number;
    currency: string;
    interval?: "month" | "year" | "lifetime";
    features: string[];
    isPopular?: boolean;
    savings?: string;
}
export declare const PLAN_METADATA: Record<SubscriptionPlan, PlanMetadata>;
export type SubscriptionDto = Subscription;
export type SubscriptionFeaturesDto = SubscriptionFeatures;
export type SubscriptionStatusResponseDto = SubscriptionStatusResponse;
export type CreateCheckoutSessionRequestDto = CreateCheckoutSessionRequest;
export type VerifyPaymentRequestDto = VerifyPaymentRequest;
export type CancelSubscriptionRequestDto = CancelSubscriptionRequest;
export type CheckoutSessionResponseDto = CheckoutSessionResponse;
export type CustomerPortalResponseDto = CustomerPortalResponse;
//# sourceMappingURL=subscription.d.ts.map