import { PricingStrategy } from "./types";
import { ProjectRequirements, ProjectEstimate, ComplexityLevel } from "../../types";
import {
  APP_PROJECT_PRICING,
  PRICING_MODIFIERS,
  PRICING_RULES_VERSION,
} from "../../catalog";

export class AppPricingStrategy implements PricingStrategy {
  calculate(requirements: ProjectRequirements): ProjectEstimate {
    const base =
      APP_PROJECT_PRICING[requirements.projectType] ||
      APP_PROJECT_PRICING["mobile_app"];

    let minPrice = base.baseMin;
    let maxPrice = base.baseMax;
    let minWeeks = base.minWeeks;
    let maxWeeks = base.maxWeeks;
    let complexityScore = base.baseComplexityScore;

    const highlights: string[] = [];
    const assumptions: string[] = [];

    // 1. Project Type Highlights
    const projectLabels: Record<string, string> = {
      mobile_app: "Native-grade cross-platform mobile application (iOS & Android)",
      desktop_app: "High-performance native desktop application (macOS & Windows)",
      mobile_web_bundle: "Unified multi-platform ecosystem with mobile apps and web dashboard",
    };
    highlights.push(projectLabels[requirements.projectType] || "Cross-platform application architecture");

    // 2. Platform Modifiers
    const platformCount = requirements.platforms.length;
    const hasIos = requirements.platforms.includes("ios");
    const hasAndroid = requirements.platforms.includes("android");
    const hasMac = requirements.platforms.includes("macos");
    const hasWin = requirements.platforms.includes("windows");

    if (hasIos && hasAndroid) {
      const mod = PRICING_MODIFIERS.platforms.both_mobile;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Single unified Flutter/React Native codebase supporting both iOS and Android");
    } else if (hasIos || hasAndroid) {
      highlights.push(`Targeted mobile release for ${hasIos ? "iOS (Apple App Store)" : "Android (Google Play Store)"}`);
    }

    if (hasMac && hasWin) {
      const mod = PRICING_MODIFIERS.platforms.cross_desktop;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Cross-desktop binary builds for both macOS and Windows");
    }

    // 3. Design status
    const designMod =
      PRICING_MODIFIERS.design[requirements.design.status] ||
      PRICING_MODIFIERS.design.needs_design;
    minPrice += designMod.min;
    maxPrice += designMod.max;
    minWeeks += designMod.weeks;
    maxWeeks += designMod.weeks;
    complexityScore += designMod.score;

    if (requirements.design.status === "ready") {
      assumptions.push("Client provides component design system and UX screen wireframes in Figma.");
    } else {
      highlights.push("Custom mobile & desktop design system tailored to native platform guidelines");
      assumptions.push("Includes wireframing, UX interaction design, and design token library.");
    }

    // 4. Feature modifiers
    if (requirements.technical.authentication || requirements.features.includes("auth")) {
      const mod = PRICING_MODIFIERS.features.authentication;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Social & email authentication with biometric FaceID / TouchID support");
    }

    if (requirements.features.includes("push_notifications")) {
      minPrice += 200;
      maxPrice += 400;
      minWeeks += 0.5;
      maxWeeks += 0.5;
      complexityScore += 10;
      highlights.push("Cross-platform push notification infrastructure (FCM / APNs)");
    }

    if (requirements.technical.offline || requirements.features.includes("offline")) {
      const mod = PRICING_MODIFIERS.features.offline;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Offline-first architecture with SQLite/Isar local storage and background cloud sync");
    }

    if (requirements.technical.payments || requirements.features.includes("payments")) {
      const mod = PRICING_MODIFIERS.features.payments;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("In-App Purchases (IAP) / Stripe payment gateway integration");
    }

    if (requirements.technical.realtime || requirements.features.includes("realtime")) {
      const mod = PRICING_MODIFIERS.features.realtime;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Real-time cloud database synchronization and live data feeds");
    }

    if (requirements.features.includes("not_sure")) {
      assumptions.push("App capabilities and platform-specific modules will be finalized during initial technical discovery.");
    }

    // 5. Integrations
    if (requirements.integrations.length > 0) {
      const isNotSure = requirements.integrations.some((i) =>
        i.name.includes("technical discovery")
      );
      if (isNotSure) {
        const intMod = PRICING_MODIFIERS.integrations.one_two;
        minPrice += intMod.min;
        maxPrice += intMod.max;
        complexityScore += intMod.score;
        assumptions.push("Backend API integrations will be evaluated and recommended during discovery.");
      } else {
        const intKey =
          requirements.integrations.length === 1
            ? "one_two"
            : requirements.integrations.length >= 3
            ? "complex_custom"
            : "multiple";
        const intMod = PRICING_MODIFIERS.integrations[intKey];
        minPrice += intMod.min;
        maxPrice += intMod.max;
        minWeeks += intMod.weeks;
        maxWeeks += intMod.weeks;
        complexityScore += intMod.score;
        highlights.push(`Integration with ${requirements.integrations.length} third-party backend API(s)`);
      }
    }

    // 6. Timeline Urgency
    const timelinePref = requirements.timeline.preference || "1_3_months";
    const timelineMod =
      PRICING_MODIFIERS.timeline[timelinePref] || PRICING_MODIFIERS.timeline["1_3_months"];
    minPrice = Math.round((minPrice * timelineMod.multiplier) / 50) * 50;
    maxPrice = Math.round((maxPrice * timelineMod.multiplier) / 50) * 50;
    complexityScore += timelineMod.score;

    if (timelinePref === "asap" || timelinePref === "under_1_month") {
      assumptions.push("Expedited sprint schedule with dedicated mobile engineering squad.");
      minWeeks = Math.max(2, Math.round(minWeeks * 0.75));
      maxWeeks = Math.max(4, Math.round(maxWeeks * 0.8));
    }

    // Standard assumptions
    assumptions.push("Includes App Store & Google Play Store release submission and compliance checks.");
    assumptions.push("Built with high-performance Flutter or React Native unified codebase.");
    assumptions.push("4 weeks of post-launch warranty and bug fixes included.");

    // Complexity
    let level: ComplexityLevel = "low";
    if (complexityScore >= 80 || platformCount > 2) {
      level = "high";
    } else if (complexityScore >= 45) {
      level = "medium";
    }

    const recommendation = {
      solution: "Modern Flutter architecture with clean BLoC/Riverpod state management and offline-first database",
      rationale:
        "Ensures identical 60fps performance on iOS, Android, and desktop while slashing development and maintenance costs in half.",
    };

    const nextSteps = [
      "Schedule a 20-minute product architecture call.",
      "Review interactive wireframe flow and API specification.",
      "Begin rapid sprint cycles with weekly TestFlight / APK builds.",
    ];

    return {
      service: "app",
      projectType: requirements.projectType,
      complexity: {
        level,
        score: complexityScore,
      },
      pricing: {
        currency: "USD",
        min: Math.min(minPrice, maxPrice),
        max: Math.max(minPrice, maxPrice),
      },
      timeline: {
        minWeeks: Math.round(Math.min(minWeeks, maxWeeks)),
        maxWeeks: Math.round(Math.max(minWeeks, maxWeeks)),
      },
      recommendation,
      highlights,
      assumptions,
      nextSteps,
      pricingRulesVersion: PRICING_RULES_VERSION,
    };
  }
}
