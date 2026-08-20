import {
  ProjectRequirements,
  ProjectEstimate,
  LeadQualification,
} from "../types";

export function scoreLead(
  contact: { name: string; email: string; company?: string; phone?: string },
  requirements: ProjectRequirements,
  estimate: ProjectEstimate
): LeadQualification {
  let score = 0;
  const factors: string[] = [];

  // 1. Budget Qualification (max +25)
  const budget = requirements.budget.range || "not_sure";
  if (budget === "10000_plus" || budget === "5000_10000") {
    score += 25;
    factors.push("Healthy enterprise/growth budget tier");
  } else if (budget === "2500_5000") {
    score += 15;
    factors.push("Mid-tier commercial budget");
  } else if (budget === "1000_2500") {
    score += 10;
  }

  // 2. Timeline Urgency (max +15)
  const timeline = requirements.timeline.preference || "1_3_months";
  if (timeline === "asap" || timeline === "under_1_month") {
    score += 15;
    factors.push("Immediate project kick-off intent");
  } else if (timeline === "1_3_months") {
    score += 10;
    factors.push("Standard active planning cycle");
  }

  // 3. Project Complexity & Investment Scale (max +20)
  if (estimate.complexity.level === "high") {
    score += 20;
    factors.push("High-complexity multi-service scope");
  } else if (estimate.complexity.level === "medium") {
    score += 12;
    factors.push("Standard custom architecture scope");
  } else {
    score += 5;
  }

  // 4. Professional Contact Indicators (max +25)
  const email = contact.email.toLowerCase().trim();
  const freeEmailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "mail.com",
  ];
  const isBusinessEmail =
    email.includes("@") &&
    !freeEmailDomains.some((d) => email.endsWith(`@${d}`));

  if (isBusinessEmail) {
    score += 15;
    factors.push("Verified corporate/business domain email");
  }

  if (contact.company && contact.company.trim().length > 1) {
    score += 10;
    factors.push("Company name identified");
  }

  // 5. Requirements Specificity (max +15)
  if (requirements.notes && requirements.notes.trim().length > 30) {
    score += 10;
    factors.push("Detailed custom brief provided");
  }
  if (requirements.integrations.length > 0) {
    score += 5;
  }

  // Clamp score
  const finalScore = Math.min(100, Math.max(0, score));

  // Temperature
  let temperature: "cold" | "warm" | "hot" = "cold";
  if (finalScore >= 70) {
    temperature = "hot";
  } else if (finalScore >= 40) {
    temperature = "warm";
  }

  return {
    budget,
    timeline,
    complexity: estimate.complexity.level,
    score: finalScore,
    temperature,
    factors,
  };
}
