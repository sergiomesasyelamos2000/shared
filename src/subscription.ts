export enum SubscriptionPlan {
  FREE = "free",
  MONTHLY = "monthly",
  YEARLY = "yearly",
  LIFETIME = "lifetime",
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  EXPIRED = "expired",
  PAST_DUE = "past_due",
  INCOMPLETE = "incomplete",
  TRIAL = "trial",
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
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

export const PLAN_METADATA: Record<SubscriptionPlan, PlanMetadata> = {
  [SubscriptionPlan.FREE]: {
    id: SubscriptionPlan.FREE,
    name: "Gratuito",
    description: "Comienza con funciones básicas",
    price: 0,
    currency: "eur",
    features: [
      "Hasta 3 rutinas",
      "Hasta 5 productos personalizados",
      "Hasta 3 comidas personalizadas",
      "Estadísticas básicas",
      "Soporte comunitario",
    ],
  },
  [SubscriptionPlan.MONTHLY]: {
    id: SubscriptionPlan.MONTHLY,
    name: "Premium Mensual",
    description: "Acceso completo con facturación mensual",
    price: 0.99,
    currency: "eur",
    interval: "month",
    features: [
      "Rutinas ilimitadas",
      "Productos y comidas personalizadas ilimitadas",
      "Análisis de alimentos con IA",
      "Estadísticas avanzadas",
      "Exportación de datos",
      "Soporte prioritario",
    ],
  },
  [SubscriptionPlan.YEARLY]: {
    id: SubscriptionPlan.YEARLY,
    name: "Premium Anual",
    description: "Mejor precio - ahorra con facturación anual",
    price: 9.99,
    currency: "eur",
    interval: "year",
    isPopular: true,
    savings: "Ahorra 17%",
    features: [
      "Rutinas ilimitadas",
      "Productos y comidas personalizadas ilimitadas",
      "Análisis de alimentos con IA",
      "Estadísticas avanzadas",
      "Exportación de datos",
      "Soporte prioritario",
      "¡2 meses gratis!",
    ],
  },
  [SubscriptionPlan.LIFETIME]: {
    id: SubscriptionPlan.LIFETIME,
    name: "Acceso de por Vida",
    description: "Pago único, acceso para siempre",
    price: 19.99,
    currency: "eur",
    interval: "lifetime",
    features: [
      "Todo lo incluido en Premium",
      "Acceso de por vida",
      "Todas las actualizaciones futuras",
      "Sin pagos recurrentes",
      "Mejor valor a largo plazo",
    ],
  },
};

export type SubscriptionDto = Subscription;
export type SubscriptionFeaturesDto = SubscriptionFeatures;
export type SubscriptionStatusResponseDto = SubscriptionStatusResponse;
export type CreateCheckoutSessionRequestDto = CreateCheckoutSessionRequest;
export type VerifyPaymentRequestDto = VerifyPaymentRequest;
export type CancelSubscriptionRequestDto = CancelSubscriptionRequest;
export type CheckoutSessionResponseDto = CheckoutSessionResponse;
export type CustomerPortalResponseDto = CustomerPortalResponse;
