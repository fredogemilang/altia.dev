import { NextRequest, NextResponse } from "next/server";
import { normalizeWizardAnswers } from "@/domain/estimator/normalizer";
import { calculateProjectEstimate } from "@/domain/estimator/pricing/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers } = body;

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid answers payload" },
        { status: 400 }
      );
    }

    const requirements = normalizeWizardAnswers(answers);
    const estimate = calculateProjectEstimate(requirements);

    return NextResponse.json({
      success: true,
      requirements,
      estimate,
    });
  } catch (error) {
    console.error("[Estimator API] Error calculating estimate:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error calculating estimate" },
      { status: 500 }
    );
  }
}
