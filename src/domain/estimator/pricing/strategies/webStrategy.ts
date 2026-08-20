import { PricingStrategy } from "./types";
import { ProjectRequirements, ProjectEstimate, ComplexityLevel } from "../../types";
import {
  WEB_PROJECT_PRICING,
  PRICING_MODIFIERS,
  PRICING_RULES_VERSION,
} from "../../catalog";

export class WebPricingStrategy implements PricingStrategy {
  calculate(requirements: ProjectRequirements): ProjectEstimate {
    const base =
      WEB_PROJECT_PRICING[requirements.projectType] ||
      WEB_PROJECT_PRICING["landing_page"];

    let minPrice = base.baseMin;
    let maxPrice = base.baseMax;
    let minWeeks = base.minWeeks;
    let maxWeeks = base.maxWeeks;
    let complexityScore = base.baseComplexityScore;

    const highlights: string[] = [];
    const assumptions: string[] = [];

    // 1. Project Type Highlight
    const projectLabels: Record<string, string> = {
      landing_page: "High-converting single-page architecture with responsive layout",
      company_profile: "5–10 page corporate web architecture with CMS & analytics",
      corporate_website: "Multi-language enterprise corporate portal with bespoke admin controls",
      custom_web_app: "Full-stack web application with custom logic & database architecture",
      saas_mvp: "Multi-tenant SaaS platform with subscription billing & production CI/CD",
      ecommerce: "Scalable e-commerce store with payment gateway & order management",
    };
    highlights.push(projectLabels[requirements.projectType] || "Bespoke web architecture");

    // 2. Design modifier
    const designMod =
      PRICING_MODIFIERS.design[requirements.design.status] ||
      PRICING_MODIFIERS.design.needs_design;
    minPrice += designMod.min;
    maxPrice += designMod.max;
    minWeeks += designMod.weeks;
    complexityScore += designMod.score;

    if (requirements.design.status === "ready") {
      assumptions.push("Client provides production-ready Figma/design tokens.");
    } else if (requirements.design.status === "needs_design") {
      highlights.push("Complete UI/UX design system & interactive prototypes by ALTIA DEV");
      assumptions.push("Includes wireframing, high-fidelity UI design, and design token system.");
    }

    // 3. Animation modifier
    if (requirements.design.animationLevel) {
      const animMod = PRICING_MODIFIERS.animation[requirements.design.animationLevel];
      if (animMod) {
        minPrice += animMod.min;
        maxPrice += animMod.max;
        complexityScore += animMod.score;
        if (requirements.design.animationLevel === "advanced") {
          highlights.push("Advanced GSAP 3D kinetic animations & interactive scroll choreography");
        }
      }
    }

    // 4. Feature modifiers
    if (requirements.technical.authentication) {
      const mod = PRICING_MODIFIERS.features.authentication;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Secure user authentication & role-based access control (RBAC)");
    }

    if (requirements.technical.payments) {
      const mod = PRICING_MODIFIERS.features.payments;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Automated payment gateway integration & webhook handling");
    }

    if (requirements.technical.cms) {
      const mod = PRICING_MODIFIERS.features.cms;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Custom headless CMS or WordPress content management setup");
    }

    if (requirements.technical.realtime) {
      const mod = PRICING_MODIFIERS.features.realtime;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Real-time WebSockets / SSE reactive updates");
    }

    if (requirements.features.includes("not_sure")) {
      assumptions.push("Technical features and optional modules will be scoped and recommended during initial technical discovery.");
    }

    // 5. Integrations modifier
    if (requirements.integrations.length > 0) {
      const isNotSure = requirements.integrations.some((i) =>
        i.name.includes("technical discovery")
      );
      if (isNotSure) {
        const intMod = PRICING_MODIFIERS.integrations.one_two;
        minPrice += intMod.min;
        maxPrice += intMod.max;
        complexityScore += intMod.score;
        assumptions.push("External API and database integrations will be evaluated and recommended during discovery.");
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
        complexityScore += intMod.score;
        highlights.push(`Integration with ${requirements.integrations.length} external third-party service(s)`);
      }
    }

    // 6. Timeline Urgency Modifier
    const timelinePref = requirements.timeline.preference || "1_3_months";
    const timelineMod =
      PRICING_MODIFIERS.timeline[timelinePref] || PRICING_MODIFIERS.timeline["1_3_months"];
    minPrice = Math.round((minPrice * timelineMod.multiplier) / 50) * 50;
    maxPrice = Math.round((maxPrice * timelineMod.multiplier) / 50) * 50;
    complexityScore += timelineMod.score;

    if (timelinePref === "asap" || timelinePref === "under_1_month") {
      assumptions.push("Expedited sprint schedule with dedicated rapid-deployment bandwidth.");
      minWeeks = Math.max(1, Math.round(minWeeks * 0.7));
      maxWeeks = Math.max(2, Math.round(maxWeeks * 0.75));
    }

    // Standard assumptions
    assumptions.push("Built with high-performance modern stack (Next.js / Laravel / WordPress / Go).");
    assumptions.push("Includes automated CI/CD pipeline, SSL, and server deployment setup.");
    assumptions.push("2–4 weeks of post-launch bug fixing & warranty support included.");

    // Complexity level
    let level: ComplexityLevel = "low";
    if (complexityScore >= 75) {
      level = "high";
    } else if (complexityScore >= 40) {
      level = "medium";
    }

    const recommendation = {
      solution:
        requirements.projectType === "saas_mvp" || requirements.projectType === "custom_web_app"
          ? "Custom Next.js 14 full-stack platform with Laravel/Go microservices and PostgreSQL"
          : "Bespoke Next.js or WordPress headless architecture with optimized Core Web Vitals",
      rationale:
        "Engineered for high performance, maximum security hardening, seamless content scalability, and zero monthly template bloat.",
    };

    const nextSteps = [
      "Schedule a 20-minute discovery call to review technical requirements.",
      "Receive a fixed architectural blueprint and scoped milestone proposal.",
      "Kick off development with weekly staging demos.",
    ];

    return {
      service: "web",
      projectType: requirements.projectType,
      complexity: {
        level,
        score: complexityScore,
      },
      pricing: {
        currency: "USD",
        min: minPrice,
        max: maxPrice,
      },
      timeline: {
        minWeeks: Math.round(minWeeks),
        maxWeeks: Math.round(maxWeeks),
      },
      recommendation,
      highlights,
      assumptions,
      nextSteps,
      pricingRulesVersion: PRICING_RULES_VERSION,
    };
  }
}
