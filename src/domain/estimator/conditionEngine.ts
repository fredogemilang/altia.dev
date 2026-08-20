import { QuestionCondition } from "./types";

export function evaluateCondition(
  condition: QuestionCondition,
  answers: Record<string, unknown>
): boolean {
  const targetValue = answers[condition.field];

  switch (condition.operator) {
    case "equals":
      return targetValue === condition.value;

    case "not_equals":
      return targetValue !== condition.value;

    case "exists":
      return targetValue !== undefined && targetValue !== null && targetValue !== "";

    case "includes":
      if (Array.isArray(targetValue)) {
        return targetValue.includes(condition.value);
      }
      if (typeof targetValue === "string") {
        return targetValue.includes(String(condition.value));
      }
      return false;

    case "not_includes":
      if (Array.isArray(targetValue)) {
        return !targetValue.includes(condition.value);
      }
      if (typeof targetValue === "string") {
        return !targetValue.includes(String(condition.value));
      }
      return true;

    default:
      return true;
  }
}

export function isQuestionVisible(
  conditions: QuestionCondition[] | undefined,
  answers: Record<string, unknown>
): boolean {
  if (!conditions || conditions.length === 0) {
    return true;
  }

  // All conditions must evaluate to true (AND logic)
  return conditions.every((condition) => evaluateCondition(condition, answers));
}
