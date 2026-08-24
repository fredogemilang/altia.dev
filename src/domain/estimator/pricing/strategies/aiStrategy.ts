import { PricingStrategy } from "./types";
import { ProjectRequirements, ProjectEstimate, ComplexityLevel } from "../../types";
import {
  AI_PROJECT_PRICING,
  PRICING_MODIFIERS,
  PRICING_RULES_VERSION,
} from "../../catalog";

export class AIPricingStrategy implements PricingStrategy {
  calculate(requirements: ProjectRequirements): ProjectEstimate {
    const base =
      AI_PROJECT_PRICING[requirements.projectType] ||
      AI_PROJECT_PRICING["ai_chatbot"];

    let minPrice = base.baseMin;
    let maxPrice = base.baseMax;
    let minWeeks = base.minWeeks;
    let maxWeeks = base.maxWeeks;
    let complexityScore = base.baseComplexityScore;

    const highlights: string[] = [];
    const assumptions: string[] = [];

    // 1. Project Type Highlights
    const projectLabels: Record<string, string> = {
      ai_chatbot: "Custom LLM support & FAQ assistant embedded in website/app",
      document_processing: "Automated OCR & LLM extraction pipeline for invoices/contracts",
      rag_knowledge_base: "Enterprise semantic search & RAG pipeline across internal documentation",
      custom_ai_agent: "Multi-step autonomous workflow system with tool-calling capabilities",
      ai_integration: "Direct LLM/Vision API integration into existing CRM, ERP, and databases",
    };
    highlights.push(projectLabels[requirements.projectType] || "Automated AI system engineering");

    // 2. Feature & Workflow Modifiers
    if (requirements.projectType === "custom_ai_agent" || requirements.features.includes("multi_step")) {
      const mod = PRICING_MODIFIERS.aiWorkflow.multi_step;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Stateful multi-agent decision chain with automated error recovery");
    }

    if (requirements.projectType === "rag_knowledge_base" || requirements.features.includes("rag")) {
      const mod = PRICING_MODIFIERS.aiWorkflow.multi_data_source;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Hybrid dense/sparse vector embedding index with reranking pipeline");
    }

    if (requirements.features.includes("human_in_the_loop")) {
      const mod = PRICING_MODIFIERS.aiWorkflow.human_in_the_loop;
      minPrice += mod.min;
      maxPrice += mod.max;
      minWeeks += mod.weeks;
      maxWeeks += mod.weeks;
      complexityScore += mod.score;
      highlights.push("Human-in-the-loop approval dashboard and confidence threshold triggers");
    }

    if (requirements.features.includes("not_sure")) {
      assumptions.push("AI automation pipeline and model architecture will be tailored during technical discovery.");
    }

    // 3. Integrations
    if (requirements.integrations.length > 0) {
      const isNotSure = requirements.integrations.some((i) =>
        i.name.includes("technical discovery")
      );
      if (isNotSure) {
        const intMod = PRICING_MODIFIERS.integrations.one_two;
        minPrice += intMod.min;
        maxPrice += intMod.max;
        complexityScore += intMod.score;
        assumptions.push("AI data sources and API integrations will be evaluated and recommended during discovery.");
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
        highlights.push(`Connected to ${requirements.integrations.length} enterprise system(s) & data sources`);
      }
    }

    // 4. Timeline Urgency
    const timelinePref = requirements.timeline.preference || "1_3_months";
    const timelineMod =
      PRICING_MODIFIERS.timeline[timelinePref] || PRICING_MODIFIERS.timeline["1_3_months"];
    minPrice = Math.round((minPrice * timelineMod.multiplier) / 50) * 50;
    maxPrice = Math.round((maxPrice * timelineMod.multiplier) / 50) * 50;
    complexityScore += timelineMod.score;

    if (timelinePref === "asap" || timelinePref === "under_1_month") {
      assumptions.push("Expedited AI pipeline sprint with immediate prototype delivery.");
      minWeeks = Math.max(1, Math.round(minWeeks * 0.75));
      maxWeeks = Math.max(2, Math.round(maxWeeks * 0.8));
    }

    // Critical AI Assumptions
    assumptions.push("Ongoing third-party LLM API consumption (OpenAI, Claude) estimated at $20–$150/month billed directly to client account.");
    assumptions.push("Includes prompt engineering, evaluation benchmark datasets, and token cost optimization.");
    assumptions.push("Delivered with automated logging, retry queues, and fallback safety guards.");

    // Complexity
    let level: ComplexityLevel = "low";
    if (complexityScore >= 75) {
      level = "high";
    } else if (complexityScore >= 40) {
      level = "medium";
    }

    const recommendation = {
      solution: "Python / FastAPI pipeline with LangChain/LlamaIndex orchestration and vector database caching",
      rationale:
        "Ensures sub-second response times, structured schema validation, and complete enterprise data privacy.",
    };

    const nextSteps = [
      "Schedule a 20-minute AI pipeline discovery session.",
      "Review sample data formats, security boundary, and API access.",
      "Deploy working prototype to sandbox environment within 7 days.",
    ];

    return {
      service: "ai",
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
