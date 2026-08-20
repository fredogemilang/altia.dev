import { ProjectRequirements, ProjectEstimate } from "../../types";

export interface PricingStrategy {
  calculate(requirements: ProjectRequirements): ProjectEstimate;
}
