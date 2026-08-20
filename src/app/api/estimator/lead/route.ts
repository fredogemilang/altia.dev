import { NextRequest, NextResponse } from "next/server";
import { normalizeWizardAnswers } from "@/domain/estimator/normalizer";
import { calculateProjectEstimate } from "@/domain/estimator/pricing/engine";
import { scoreLead } from "@/domain/estimator/leads/scoring";
import { Lead, ProjectRequirements, ProjectEstimate } from "@/domain/estimator/types";
import { syncLeadToPayload } from "@/lib/payload/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contact, answers, locale } = body;
    let { requirements, estimate } = body;

    // Validate required contact details (Name, Email, WhatsApp/Phone are all required)
    if (
      !contact ||
      !contact.name ||
      typeof contact.name !== "string" ||
      !contact.name.trim() ||
      !contact.email ||
      typeof contact.email !== "string" ||
      !contact.email.trim() ||
      !contact.phone ||
      typeof contact.phone !== "string" ||
      !contact.phone.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Full name, work email, and WhatsApp / phone number are required.",
        },
        { status: 400 }
      );
    }

    // Calculate requirements & estimate if not already provided
    if (!requirements || !estimate) {
      if (!answers || typeof answers !== "object") {
        return NextResponse.json(
          { success: false, error: "Missing answers or requirements payload." },
          { status: 400 }
        );
      }
      requirements = normalizeWizardAnswers(answers) as ProjectRequirements;
      estimate = calculateProjectEstimate(requirements) as ProjectEstimate;
    }

    const qualification = scoreLead(contact, requirements, estimate);

    const lead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      contact: {
        name: contact.name.trim(),
        email: contact.email.trim(),
        company: contact.company?.trim() || undefined,
        phone: contact.phone.trim(),
      },
      project: {
        requirements,
        estimate,
      },
      qualification,
      source: {
        locale: locale || "en",
        referrer: req.headers.get("referer") || undefined,
        userAgent: req.headers.get("user-agent") || undefined,
      },
      status: "new",
      createdAt: new Date().toISOString(),
    };

    console.log("[Lead Captured & Scored with WhatsApp]:", JSON.stringify(lead, null, 2));

    // Asynchronously sync lead to Payload CMS Leads collection
    syncLeadToPayload(lead).catch((err) => {
      console.warn("[Payload CMS] Lead sync background warning:", err);
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      requirements,
      estimate,
      qualification,
    });
  } catch (error) {
    console.error("[Estimator Lead API] Error creating lead:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error capturing lead" },
      { status: 500 }
    );
  }
}
