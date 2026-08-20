export const PRICING_RULES_VERSION = "2026.08";

export interface ProjectTypePricing {
  baseMin: number;
  baseMax: number;
  minWeeks: number;
  maxWeeks: number;
  baseComplexityScore: number;
}

export const WEB_PROJECT_PRICING: Record<string, ProjectTypePricing> = {
  landing_page: {
    baseMin: 350,
    baseMax: 600,
    minWeeks: 1,
    maxWeeks: 2,
    baseComplexityScore: 10,
  },
  company_profile: {
    baseMin: 750,
    baseMax: 1200,
    minWeeks: 2,
    maxWeeks: 3,
    baseComplexityScore: 20,
  },
  corporate_website: {
    baseMin: 1500,
    baseMax: 2400,
    minWeeks: 3,
    maxWeeks: 5,
    baseComplexityScore: 35,
  },
  custom_web_app: {
    baseMin: 2500,
    baseMax: 4500,
    minWeeks: 4,
    maxWeeks: 8,
    baseComplexityScore: 50,
  },
  saas_mvp: {
    baseMin: 3500,
    baseMax: 6000,
    minWeeks: 6,
    maxWeeks: 10,
    baseComplexityScore: 65,
  },
  ecommerce: {
    baseMin: 1500,
    baseMax: 2800,
    minWeeks: 3,
    maxWeeks: 6,
    baseComplexityScore: 40,
  },
};

export const APP_PROJECT_PRICING: Record<string, ProjectTypePricing> = {
  mobile_app: {
    baseMin: 2500,
    baseMax: 4200,
    minWeeks: 4,
    maxWeeks: 8,
    baseComplexityScore: 45,
  },
  desktop_app: {
    baseMin: 2000,
    baseMax: 3600,
    minWeeks: 4,
    maxWeeks: 7,
    baseComplexityScore: 40,
  },
  mobile_web_bundle: {
    baseMin: 4500,
    baseMax: 7500,
    minWeeks: 6,
    maxWeeks: 12,
    baseComplexityScore: 70,
  },
};

export const AI_PROJECT_PRICING: Record<string, ProjectTypePricing> = {
  ai_chatbot: {
    baseMin: 500,
    baseMax: 900,
    minWeeks: 1,
    maxWeeks: 2,
    baseComplexityScore: 20,
  },
  document_processing: {
    baseMin: 1000,
    baseMax: 1800,
    minWeeks: 2,
    maxWeeks: 4,
    baseComplexityScore: 35,
  },
  rag_knowledge_base: {
    baseMin: 1500,
    baseMax: 2600,
    minWeeks: 3,
    maxWeeks: 5,
    baseComplexityScore: 45,
  },
  custom_ai_agent: {
    baseMin: 2000,
    baseMax: 3800,
    minWeeks: 4,
    maxWeeks: 8,
    baseComplexityScore: 60,
  },
  ai_integration: {
    baseMin: 750,
    baseMax: 1400,
    minWeeks: 2,
    maxWeeks: 3,
    baseComplexityScore: 25,
  },
};

export const PRICING_MODIFIERS = {
  // Design Modifiers
  design: {
    ready: { min: 0, max: 0, weeks: 0, score: 0 },
    needs_refinement: { min: 200, max: 400, weeks: 0.5, score: 10 },
    needs_design: { min: 400, max: 900, weeks: 1, score: 20 },
  },

  // Animation Level Modifiers
  animation: {
    none: { min: 0, max: 0, weeks: 0, score: 0 },
    subtle: { min: 100, max: 250, weeks: 0, score: 5 },
    advanced: { min: 300, max: 600, weeks: 0.5, score: 15 },
  },

  // Technical Feature Modifiers
  features: {
    authentication: { min: 250, max: 500, weeks: 0.5, score: 10 },
    payments: { min: 300, max: 600, weeks: 0.5, score: 15 },
    realtime: { min: 350, max: 700, weeks: 1, score: 15 },
    offline: { min: 300, max: 600, weeks: 1, score: 15 },
    cms: { min: 200, max: 400, weeks: 0.5, score: 10 },
    multilingual: { min: 200, max: 450, weeks: 0.5, score: 10 },
  },

  // Integrations Modifiers
  integrations: {
    none: { min: 0, max: 0, weeks: 0, score: 0 },
    one_two: { min: 250, max: 500, weeks: 0.5, score: 10 },
    multiple: { min: 600, max: 1200, weeks: 1.5, score: 25 },
    complex_custom: { min: 1000, max: 2000, weeks: 2, score: 35 },
  },

  // Platform Modifiers (for Apps)
  platforms: {
    single_platform: { min: 0, max: 0, weeks: 0, score: 0 },
    both_mobile: { min: 500, max: 1000, weeks: 1, score: 15 }, // iOS + Android
    cross_desktop: { min: 400, max: 800, weeks: 1, score: 15 }, // macOS + Windows
  },

  // AI Workflow Depth Modifiers
  aiWorkflow: {
    single_step: { min: 0, max: 0, weeks: 0, score: 0 },
    multi_step: { min: 400, max: 900, weeks: 1, score: 20 },
    human_in_the_loop: { min: 300, max: 600, weeks: 0.5, score: 15 },
    multi_data_source: { min: 350, max: 750, weeks: 1, score: 15 },
  },

  // Timeline Urgency Modifiers
  timeline: {
    no_deadline: { multiplier: 1.0, score: 0 },
    "1_3_months": { multiplier: 1.0, score: 5 },
    under_1_month: { multiplier: 1.15, score: 15 }, // Rush surcharge
    asap: { multiplier: 1.25, score: 25 }, // High priority rush
  },
};
