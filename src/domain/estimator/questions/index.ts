import { WizardQuestion } from "../types";

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  // ─── STEP 1: SERVICE SELECTION ────────────────────────────────────
  {
    id: "service",
    type: "single_select",
    category: "service",
    titleKey: "Estimator.questions.service.title",
    descriptionKey: "Estimator.questions.service.desc",
    required: true,
    mapsTo: "service",
    options: [
      {
        value: "web",
        labelKey: "Estimator.questions.service.options.web.label",
        descriptionKey: "Estimator.questions.service.options.web.desc",
        icon: "Globe",
        badge: "from $350",
      },
      {
        value: "app",
        labelKey: "Estimator.questions.service.options.app.label",
        descriptionKey: "Estimator.questions.service.options.app.desc",
        icon: "Smartphone",
        badge: "from $2,000",
      },
      {
        value: "ai",
        labelKey: "Estimator.questions.service.options.ai.label",
        descriptionKey: "Estimator.questions.service.options.ai.desc",
        icon: "Cpu",
        badge: "from $500",
      },
    ],
  },

  // ─── WEB BRANCH ───────────────────────────────────────────────────
  {
    id: "web_project_type",
    type: "single_select",
    category: "web",
    titleKey: "Estimator.questions.web_project_type.title",
    descriptionKey: "Estimator.questions.web_project_type.desc",
    required: true,
    mapsTo: "projectType",
    conditions: [{ field: "service", operator: "equals", value: "web" }],
    options: [
      {
        value: "landing_page",
        labelKey: "Estimator.questions.web_project_type.options.landing_page.label",
        descriptionKey: "Estimator.questions.web_project_type.options.landing_page.desc",
        badge: "from $350",
      },
      {
        value: "company_profile",
        labelKey: "Estimator.questions.web_project_type.options.company_profile.label",
        descriptionKey: "Estimator.questions.web_project_type.options.company_profile.desc",
        badge: "from $750",
      },
      {
        value: "corporate_website",
        labelKey: "Estimator.questions.web_project_type.options.corporate_website.label",
        descriptionKey: "Estimator.questions.web_project_type.options.corporate_website.desc",
        badge: "from $1,500",
      },
      {
        value: "custom_web_app",
        labelKey: "Estimator.questions.web_project_type.options.custom_web_app.label",
        descriptionKey: "Estimator.questions.web_project_type.options.custom_web_app.desc",
        badge: "from $2,500",
      },
      {
        value: "saas_mvp",
        labelKey: "Estimator.questions.web_project_type.options.saas_mvp.label",
        descriptionKey: "Estimator.questions.web_project_type.options.saas_mvp.desc",
        badge: "from $3,500",
      },
      {
        value: "ecommerce",
        labelKey: "Estimator.questions.web_project_type.options.ecommerce.label",
        descriptionKey: "Estimator.questions.web_project_type.options.ecommerce.desc",
        badge: "from $1,500",
      },
    ],
  },
  {
    id: "web_features",
    type: "multi_select",
    category: "web",
    titleKey: "Estimator.questions.web_features.title",
    descriptionKey: "Estimator.questions.web_features.desc",
    required: false,
    mapsTo: "features",
    conditions: [{ field: "service", operator: "equals", value: "web" }],
    options: [
      {
        value: "cms",
        labelKey: "Estimator.questions.web_features.options.cms.label",
        descriptionKey: "Estimator.questions.web_features.options.cms.desc",
      },
      {
        value: "auth",
        labelKey: "Estimator.questions.web_features.options.auth.label",
        descriptionKey: "Estimator.questions.web_features.options.auth.desc",
      },
      {
        value: "payments",
        labelKey: "Estimator.questions.web_features.options.payments.label",
        descriptionKey: "Estimator.questions.web_features.options.payments.desc",
      },
      {
        value: "multilingual",
        labelKey: "Estimator.questions.web_features.options.multilingual.label",
        descriptionKey: "Estimator.questions.web_features.options.multilingual.desc",
      },
      {
        value: "realtime",
        labelKey: "Estimator.questions.web_features.options.realtime.label",
        descriptionKey: "Estimator.questions.web_features.options.realtime.desc",
      },
      {
        value: "animation",
        labelKey: "Estimator.questions.web_features.options.animation.label",
        descriptionKey: "Estimator.questions.web_features.options.animation.desc",
      },
      {
        value: "not_sure",
        labelKey: "Estimator.questions.web_features.options.not_sure.label",
        descriptionKey: "Estimator.questions.web_features.options.not_sure.desc",
      },
    ],
  },

  // ─── APP BRANCH ───────────────────────────────────────────────────
  {
    id: "app_project_type",
    type: "single_select",
    category: "app",
    titleKey: "Estimator.questions.app_project_type.title",
    descriptionKey: "Estimator.questions.app_project_type.desc",
    required: true,
    mapsTo: "projectType",
    conditions: [{ field: "service", operator: "equals", value: "app" }],
    options: [
      {
        value: "mobile_app",
        labelKey: "Estimator.questions.app_project_type.options.mobile_app.label",
        descriptionKey: "Estimator.questions.app_project_type.options.mobile_app.desc",
        badge: "from $2,500",
      },
      {
        value: "desktop_app",
        labelKey: "Estimator.questions.app_project_type.options.desktop_app.label",
        descriptionKey: "Estimator.questions.app_project_type.options.desktop_app.desc",
        badge: "from $2,000",
      },
      {
        value: "mobile_web_bundle",
        labelKey: "Estimator.questions.app_project_type.options.mobile_web_bundle.label",
        descriptionKey: "Estimator.questions.app_project_type.options.mobile_web_bundle.desc",
        badge: "from $4,500",
      },
    ],
  },
  {
    id: "app_platforms",
    type: "multi_select",
    category: "app",
    titleKey: "Estimator.questions.app_platforms.title",
    descriptionKey: "Estimator.questions.app_platforms.desc",
    required: true,
    mapsTo: "platforms",
    conditions: [{ field: "service", operator: "equals", value: "app" }],
    options: [
      {
        value: "ios",
        labelKey: "Estimator.questions.app_platforms.options.ios.label",
      },
      {
        value: "android",
        labelKey: "Estimator.questions.app_platforms.options.android.label",
      },
      {
        value: "macos",
        labelKey: "Estimator.questions.app_platforms.options.macos.label",
      },
      {
        value: "windows",
        labelKey: "Estimator.questions.app_platforms.options.windows.label",
      },
      {
        value: "recommended_mobile",
        labelKey: "Estimator.questions.app_platforms.options.recommended_mobile.label",
      },
    ],
  },
  {
    id: "app_features",
    type: "multi_select",
    category: "app",
    titleKey: "Estimator.questions.app_features.title",
    descriptionKey: "Estimator.questions.app_features.desc",
    required: false,
    mapsTo: "features",
    conditions: [{ field: "service", operator: "equals", value: "app" }],
    options: [
      {
        value: "auth",
        labelKey: "Estimator.questions.app_features.options.auth.label",
        descriptionKey: "Estimator.questions.app_features.options.auth.desc",
      },
      {
        value: "push_notifications",
        labelKey: "Estimator.questions.app_features.options.push_notifications.label",
        descriptionKey: "Estimator.questions.app_features.options.push_notifications.desc",
      },
      {
        value: "offline",
        labelKey: "Estimator.questions.app_features.options.offline.label",
        descriptionKey: "Estimator.questions.app_features.options.offline.desc",
      },
      {
        value: "payments",
        labelKey: "Estimator.questions.app_features.options.payments.label",
        descriptionKey: "Estimator.questions.app_features.options.payments.desc",
      },
      {
        value: "realtime",
        labelKey: "Estimator.questions.app_features.options.realtime.label",
        descriptionKey: "Estimator.questions.app_features.options.realtime.desc",
      },
      {
        value: "not_sure",
        labelKey: "Estimator.questions.app_features.options.not_sure.label",
        descriptionKey: "Estimator.questions.app_features.options.not_sure.desc",
      },
    ],
  },

  // ─── AI BRANCH ────────────────────────────────────────────────────
  {
    id: "ai_project_type",
    type: "single_select",
    category: "ai",
    titleKey: "Estimator.questions.ai_project_type.title",
    descriptionKey: "Estimator.questions.ai_project_type.desc",
    required: true,
    mapsTo: "projectType",
    conditions: [{ field: "service", operator: "equals", value: "ai" }],
    options: [
      {
        value: "ai_chatbot",
        labelKey: "Estimator.questions.ai_project_type.options.ai_chatbot.label",
        descriptionKey: "Estimator.questions.ai_project_type.options.ai_chatbot.desc",
        badge: "from $500",
      },
      {
        value: "document_processing",
        labelKey: "Estimator.questions.ai_project_type.options.document_processing.label",
        descriptionKey: "Estimator.questions.ai_project_type.options.document_processing.desc",
        badge: "from $1,000",
      },
      {
        value: "rag_knowledge_base",
        labelKey: "Estimator.questions.ai_project_type.options.rag_knowledge_base.label",
        descriptionKey: "Estimator.questions.ai_project_type.options.rag_knowledge_base.desc",
        badge: "from $1,500",
      },
      {
        value: "custom_ai_agent",
        labelKey: "Estimator.questions.ai_project_type.options.custom_ai_agent.label",
        descriptionKey: "Estimator.questions.ai_project_type.options.custom_ai_agent.desc",
        badge: "from $2,000",
      },
      {
        value: "ai_integration",
        labelKey: "Estimator.questions.ai_project_type.options.ai_integration.label",
        descriptionKey: "Estimator.questions.ai_project_type.options.ai_integration.desc",
        badge: "from $750",
      },
    ],
  },
  {
    id: "ai_workflow_depth",
    type: "single_select",
    category: "ai",
    titleKey: "Estimator.questions.ai_workflow_depth.title",
    descriptionKey: "Estimator.questions.ai_workflow_depth.desc",
    required: true,
    mapsTo: "workflowDepth",
    conditions: [{ field: "service", operator: "equals", value: "ai" }],
    options: [
      {
        value: "single_step",
        labelKey: "Estimator.questions.ai_workflow_depth.options.single_step.label",
        descriptionKey: "Estimator.questions.ai_workflow_depth.options.single_step.desc",
      },
      {
        value: "multi_step",
        labelKey: "Estimator.questions.ai_workflow_depth.options.multi_step.label",
        descriptionKey: "Estimator.questions.ai_workflow_depth.options.multi_step.desc",
      },
      {
        value: "human_in_the_loop",
        labelKey: "Estimator.questions.ai_workflow_depth.options.human_in_the_loop.label",
        descriptionKey: "Estimator.questions.ai_workflow_depth.options.human_in_the_loop.desc",
      },
      {
        value: "multi_data_source",
        labelKey: "Estimator.questions.ai_workflow_depth.options.multi_data_source.label",
        descriptionKey: "Estimator.questions.ai_workflow_depth.options.multi_data_source.desc",
      },
      {
        value: "not_sure",
        labelKey: "Estimator.questions.ai_workflow_depth.options.not_sure.label",
        descriptionKey: "Estimator.questions.ai_workflow_depth.options.not_sure.desc",
      },
    ],
  },

  // ─── UNIVERSAL CONVERGENCE QUESTIONS ─────────────────────────────
  {
    id: "integrations_level",
    type: "single_select",
    category: "common",
    titleKey: "Estimator.questions.integrations_level.title",
    descriptionKey: "Estimator.questions.integrations_level.desc",
    required: true,
    mapsTo: "integrations",
    options: [
      {
        value: "none",
        labelKey: "Estimator.questions.integrations_level.options.none.label",
        descriptionKey: "Estimator.questions.integrations_level.options.none.desc",
      },
      {
        value: "one_two",
        labelKey: "Estimator.questions.integrations_level.options.one_two.label",
        descriptionKey: "Estimator.questions.integrations_level.options.one_two.desc",
      },
      {
        value: "multiple",
        labelKey: "Estimator.questions.integrations_level.options.multiple.label",
        descriptionKey: "Estimator.questions.integrations_level.options.multiple.desc",
      },
      {
        value: "complex_custom",
        labelKey: "Estimator.questions.integrations_level.options.complex_custom.label",
        descriptionKey: "Estimator.questions.integrations_level.options.complex_custom.desc",
      },
      {
        value: "not_sure",
        labelKey: "Estimator.questions.integrations_level.options.not_sure.label",
        descriptionKey: "Estimator.questions.integrations_level.options.not_sure.desc",
      },
    ],
  },
  {
    id: "design_status",
    type: "single_select",
    category: "common",
    titleKey: "Estimator.questions.design_status.title",
    descriptionKey: "Estimator.questions.design_status.desc",
    required: true,
    mapsTo: "design.status",
    options: [
      {
        value: "ready",
        labelKey: "Estimator.questions.design_status.options.ready.label",
        descriptionKey: "Estimator.questions.design_status.options.ready.desc",
      },
      {
        value: "needs_refinement",
        labelKey: "Estimator.questions.design_status.options.needs_refinement.label",
        descriptionKey: "Estimator.questions.design_status.options.needs_refinement.desc",
      },
      {
        value: "needs_design",
        labelKey: "Estimator.questions.design_status.options.needs_design.label",
        descriptionKey: "Estimator.questions.design_status.options.needs_design.desc",
      },
    ],
  },
  {
    id: "timeline_preference",
    type: "single_select",
    category: "common",
    titleKey: "Estimator.questions.timeline_preference.title",
    descriptionKey: "Estimator.questions.timeline_preference.desc",
    required: true,
    mapsTo: "timeline.preference",
    options: [
      {
        value: "no_deadline",
        labelKey: "Estimator.questions.timeline_preference.options.no_deadline.label",
        descriptionKey: "Estimator.questions.timeline_preference.options.no_deadline.desc",
      },
      {
        value: "1_3_months",
        labelKey: "Estimator.questions.timeline_preference.options.1_3_months.label",
        descriptionKey: "Estimator.questions.timeline_preference.options.1_3_months.desc",
      },
      {
        value: "under_1_month",
        labelKey: "Estimator.questions.timeline_preference.options.under_1_month.label",
        descriptionKey: "Estimator.questions.timeline_preference.options.under_1_month.desc",
      },
      {
        value: "asap",
        labelKey: "Estimator.questions.timeline_preference.options.asap.label",
        descriptionKey: "Estimator.questions.timeline_preference.options.asap.desc",
      },
    ],
  },
  {
    id: "budget_range",
    type: "single_select",
    category: "common",
    titleKey: "Estimator.questions.budget_range.title",
    descriptionKey: "Estimator.questions.budget_range.desc",
    required: true,
    mapsTo: "budget.range",
    options: [
      {
        value: "under_1000",
        labelKey: "Estimator.questions.budget_range.options.under_1000.label",
      },
      {
        value: "1000_2500",
        labelKey: "Estimator.questions.budget_range.options.1000_2500.label",
      },
      {
        value: "2500_5000",
        labelKey: "Estimator.questions.budget_range.options.2500_5000.label",
      },
      {
        value: "5000_10000",
        labelKey: "Estimator.questions.budget_range.options.5000_10000.label",
      },
      {
        value: "10000_plus",
        labelKey: "Estimator.questions.budget_range.options.10000_plus.label",
      },
      {
        value: "not_sure",
        labelKey: "Estimator.questions.budget_range.options.not_sure.label",
      },
    ],
  },
  {
    id: "additional_notes",
    type: "textarea",
    category: "common",
    titleKey: "Estimator.questions.additional_notes.title",
    descriptionKey: "Estimator.questions.additional_notes.desc",
    placeholderKey: "Estimator.questions.additional_notes.placeholder",
    required: false,
    mapsTo: "notes",
  },
];
