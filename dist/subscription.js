"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAN_METADATA = exports.SubscriptionStatus = exports.SubscriptionPlan = void 0;
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "free";
    SubscriptionPlan["MONTHLY"] = "monthly";
    SubscriptionPlan["YEARLY"] = "yearly";
    SubscriptionPlan["LIFETIME"] = "lifetime";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["CANCELED"] = "canceled";
    SubscriptionStatus["EXPIRED"] = "expired";
    SubscriptionStatus["PAST_DUE"] = "past_due";
    SubscriptionStatus["INCOMPLETE"] = "incomplete";
    SubscriptionStatus["TRIAL"] = "trial";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
exports.PLAN_METADATA = {
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
