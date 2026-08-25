import {
  ProjectRequirements,
  ServiceType,
  DesignStatus,
  AnimationLevel,
  TimelinePreference,
  IntegrationRequirement,
} from "./types";

export function normalizeWizardAnswers(
  answers: Record<string, unknown>
): ProjectRequirements {
  const service = (answers["service"] as ServiceType) || "web";

  // Derive project type
  let projectType = "landing_page";
  if (service === "web") {
    projectType = (answers["web_project_type"] as string) || "landing_page";
  } else if (service === "app") {
    projectType = (answers["app_project_type"] as string) || "mobile_app";
  } else if (service === "ai") {
    projectType = (answers["ai_project_type"] as string) || "ai_chatbot";
  }

  // Derive goals
  const goals: string[] = [];
  if (Array.isArray(answers["goals"])) {
    goals.push(...(answers["goals"] as string[]));
  } else if (typeof answers["primary_goal"] === "string") {
    goals.push(answers["primary_goal"]);
  }

  // Derive features
  const features: string[] = [];
  if (Array.isArray(answers["web_features"])) {
    features.push(...(answers["web_features"] as string[]));
  }
  if (Array.isArray(answers["app_features"])) {
    features.push(...(answers["app_features"] as string[]));
  }
  if (Array.isArray(answers["ai_features"])) {
    features.push(...(answers["ai_features"] as string[]));
  }

  // AI workflow depth → push into features so pricing strategy can detect it
  if (typeof answers["ai_workflow_depth"] === "string" && answers["ai_workflow_depth"] !== "single_step" && answers["ai_workflow_depth"] !== "not_sure") {
    const depth = answers["ai_workflow_depth"] as string;
    if (!features.includes(depth)) {
      features.push(depth);
    }
  }
  if (answers["ai_workflow_depth"] === "not_sure" && !features.includes("not_sure")) {
    features.push("not_sure");
  }

  // Derive integrations
  const integrations: IntegrationRequirement[] = [];
  const rawIntegrations = answers["integrations_level"] as string;
  if (rawIntegrations === "one_two") {
    integrations.push({ name: "1-2 standard integrations", category: "crm" });
  } else if (rawIntegrations === "multiple") {
    integrations.push(
      { name: "Multiple third-party APIs", category: "custom" },
      { name: "Database/CRM sync", category: "database" }
    );
  } else if (rawIntegrations === "complex_custom") {
    integrations.push(
      { name: "Custom enterprise legacy integrations", category: "custom" },
      { name: "Complex webhooks & message queues", category: "custom" },
      { name: "Multi-system data orchestration layer", category: "database" }
    );
  } else if (rawIntegrations === "not_sure") {
    integrations.push({
      name: "To be recommended during technical discovery",
      category: "custom",
    });
  }

  // Derive platforms
  const platforms: string[] = [];
  if (Array.isArray(answers["app_platforms"])) {
    const rawPlatforms = answers["app_platforms"] as string[];
    if (rawPlatforms.includes("recommended_mobile")) {
      if (!platforms.includes("ios")) platforms.push("ios");
      if (!platforms.includes("android")) platforms.push("android");
    }
    rawPlatforms.forEach((p) => {
      if (p !== "recommended_mobile" && !platforms.includes(p)) {
        platforms.push(p);
      }
    });
  } else if (service === "web") {
    platforms.push("web");
  }

  // Design
  const designStatus = (answers["design_status"] as DesignStatus) || "needs_design";
  // Auto-derive animation level: if user selected "animation" feature → advanced, otherwise none
  const animationLevel: AnimationLevel = features.includes("animation") ? "advanced" : "none";

  // Content
  const pages = typeof answers["page_count"] === "number" ? answers["page_count"] : undefined;
  const languages = typeof answers["languages_count"] === "number" ? answers["languages_count"] : 1;

  // Technical Booleans
  const auth = features.includes("auth") || answers["auth_required"] === true;
  const payments = features.includes("payments") || answers["payments_required"] === true;
  const realtime = features.includes("realtime") || answers["realtime_required"] === true;
  const offline = features.includes("offline") || answers["offline_required"] === true;
  const cms = features.includes("cms") || answers["cms_required"] === true;

  // Timeline & Budget
  const timelinePreference = (answers["timeline_preference"] as TimelinePreference) || "1_3_months";
  const budgetRange = (answers["budget_range"] as string) || "not_sure";
  const notes = (answers["additional_notes"] as string) || "";

  return {
    service,
    projectType,
    goals,
    features,
    integrations,
    platforms,
    design: {
      status: designStatus,
      animationLevel,
    },
    content: {
      pages,
      languages,
    },
    technical: {
      authentication: auth,
      payments,
      realtime,
      offline,
      cms,
    },
    timeline: {
      preference: timelinePreference,
    },
    budget: {
      range: budgetRange,
    },
    notes: notes.trim() || undefined,
    source: {
      inputMethod: "wizard",
    },
  };
}
