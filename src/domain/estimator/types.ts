export type ServiceType = "web" | "app" | "ai";

export type ComplexityLevel = "low" | "medium" | "high";

export type TimelinePreference = "no_deadline" | "1_3_months" | "under_1_month" | "asap";

export type DesignStatus = "ready" | "needs_refinement" | "needs_design";

export type AnimationLevel = "none" | "subtle" | "advanced";

export interface IntegrationRequirement {
  name: string;
  category?: "payment" | "crm" | "analytics" | "auth" | "database" | "custom";
}

export interface ProjectRequirements {
  service: ServiceType;
  projectType: string;
  goals: string[];
  features: string[];
  integrations: IntegrationRequirement[];
  platforms: string[];

  design: {
    status: DesignStatus;
    animationLevel?: AnimationLevel;
  };

  content: {
    pages?: number;
    languages?: number;
    contentReady?: boolean;
  };

  technical: {
    authentication?: boolean;
    payments?: boolean;
    realtime?: boolean;
    offline?: boolean;
    cms?: boolean;
  };

  timeline: {
    preference?: TimelinePreference;
  };

  budget: {
    range?: string;
  };

  notes?: string;

  source: {
    inputMethod: "wizard" | "ai" | "hybrid";
  };
}

export interface ProjectEstimate {
  service: ServiceType;
  projectType: string;

  complexity: {
    level: ComplexityLevel;
    score?: number;
  };

  pricing: {
    currency: "USD";
    min: number;
    max: number;
  };

  timeline: {
    minWeeks: number;
    maxWeeks: number;
  };

  recommendation: {
    solution: string;
    rationale: string;
  };

  highlights: string[];
  assumptions: string[];
  nextSteps: string[];

  pricingRulesVersion: string;
}

export interface WizardOption {
  value: string;
  labelKey: string;
  descriptionKey?: string;
  icon?: string;
  badge?: string;
}

export interface QuestionCondition {
  field: string;
  operator: "equals" | "not_equals" | "includes" | "not_includes" | "exists";
  value?: unknown;
}

export interface WizardQuestion {
  id: string;
  type: "single_select" | "multi_select" | "number" | "text" | "textarea";
  titleKey: string;
  descriptionKey?: string;
  category: "service" | "web" | "app" | "ai" | "common";
  options?: WizardOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholderKey?: string;
  required: boolean;
  conditions?: QuestionCondition[];
  mapsTo: string;
}

export interface LeadQualification {
  budget?: string;
  timeline?: string;
  complexity?: ComplexityLevel;
  score: number;
  temperature: "cold" | "warm" | "hot";
  factors: string[];
}

export interface Lead {
  id: string;
  contact: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  project: {
    requirements: ProjectRequirements;
    estimate: ProjectEstimate;
  };
  qualification: LeadQualification;
  source: {
    locale: string;
    referrer?: string;
    userAgent?: string;
  };
  status: "new" | "qualified" | "contacted" | "discovery" | "proposal_sent" | "won" | "lost";
  createdAt: string;
}
