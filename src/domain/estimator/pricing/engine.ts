import { ProjectRequirements, ProjectEstimate } from "../types";
import { WebPricingStrategy } from "./strategies/webStrategy";
import { AppPricingStrategy } from "./strategies/appStrategy";
import { AIPricingStrategy } from "./strategies/aiStrategy";
import { PricingStrategy } from "./strategies/types";

const strategies: Record<string, PricingStrategy> = {
  web: new WebPricingStrategy(),
  app: new AppPricingStrategy(),
  ai: new AIPricingStrategy(),
};

export function calculateProjectEstimate(
  requirements: ProjectRequirements
): ProjectEstimate {
  const strategy = strategies[requirements.service] || strategies["web"];
  return strategy.calculate(requirements);
}
