/**
 * Core business logic and types for ALTIA DEV Backend APIs
 * Shared between Cloudflare Pages Functions and Vite Local Dev Server
 */

export interface ContactPayload {
  name: string;
  email: string;
  service: string;
  budget?: string;
  message: string;
}

export interface EstimatorAnswers {
  service?: 'web' | 'app' | 'ai';
  scope?: 'landing' | 'mvp' | 'custom' | 'enterprise';
  timeline?: 'asap' | 'standard' | 'flexible';
  complexity?: 'low' | 'medium' | 'high';
  features?: string[];
  [key: string]: any;
}

export interface LeadContact {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface LeadPayload {
  contact: LeadContact;
  answers: EstimatorAnswers;
  locale?: string;
}

export interface EnvBindings {
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  CONTACT_RECEIVER_EMAIL?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  [key: string]: string | undefined;
}

// -------------------------------------------------------------
// 1. Contact Form Handler
// -------------------------------------------------------------
export async function handleContactSubmission(
  payload: ContactPayload,
  env: EnvBindings = {}
) {
  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const service = (payload.service || '').trim();
  const budget = (payload.budget || 'Not specified').trim();
  const message = (payload.message || '').trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Name is required (min 2 characters).';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Valid email is required.';
  if (!service) errors.service = 'Service is required.';
  if (message.length < 5) errors.message = 'Message is required (min 5 characters).';

  if (Object.keys(errors).length > 0) {
    return {
      status: 422,
      body: {
        success: false,
        error: 'Validation failed',
        details: errors,
      },
    };
  }

  const apiKey = env.BREVO_API_KEY || (typeof process !== 'undefined' ? process.env.BREVO_API_KEY : undefined);
  const senderEmail = env.BREVO_SENDER_EMAIL || (typeof process !== 'undefined' ? process.env.BREVO_SENDER_EMAIL : undefined) || 'hello@altia.dev';
  const senderName = env.BREVO_SENDER_NAME || (typeof process !== 'undefined' ? process.env.BREVO_SENDER_NAME : undefined) || 'ALTIA DEV Website';
  const receiverEmail = env.CONTACT_RECEIVER_EMAIL || (typeof process !== 'undefined' ? process.env.CONTACT_RECEIVER_EMAIL : undefined) || 'hello@altia.dev';

  const logEntry = {
    timestamp: new Date().toISOString(),
    name,
    email,
    service,
    budget,
    message,
  };

  // Development Mock Mode if no Brevo API key is configured
  if (!apiKey || apiKey === 'your_brevo_api_key_here') {
    console.log('[ALTIA DEV Contact API - Development Mock Mode]', logEntry);
    return {
      status: 200,
      body: {
        success: true,
        message: 'Inquiry received successfully (Development Mock Mode).',
        data: logEntry,
      },
    };
  }

  // Live Brevo Integration
  try {
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E8DFD3; border-radius: 16px; background-color: #FFF6E8; color: #2F2A26;">
        <h2 style="color: #E34234; margin-top: 0; font-size: 20px;">New Project Brief Received</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #E34234;">${escapeHtml(email)}</a></p>
        <p><strong>Service of Interest:</strong> ${escapeHtml(service)}</p>
        <p><strong>Estimated Budget:</strong> ${escapeHtml(budget)}</p>
        <div style="margin-top: 20px; padding: 16px; background: #FAF4E9; border-radius: 8px; border-left: 4px solid #E34234;">
          <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Project Details & Message:</p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
        </div>
        <p style="font-size: 12px; color: #8A8078; margin-top: 24px; border-top: 1px solid #E8DFD3; padding-top: 12px;">
          Sent from ALTIA DEV Contact Form (${new Date().toLocaleString()})
        </p>
      </div>
    `;

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: receiverEmail, name: 'ALTIA DEV Inquiries' }],
        replyTo: { email, name },
        subject: `[New Inquiry] ${name}: ${service}`,
        htmlContent,
      }),
    });

    if (brevoRes.ok) {
      return {
        status: 200,
        body: {
          success: true,
          message: 'Your message has been sent successfully to ALTIA DEV.',
        },
      };
    } else {
      const errData = await brevoRes.json().catch(() => ({}));
      return {
        status: 502,
        body: {
          success: false,
          error: 'Failed to deliver email through Brevo API.',
          details: errData,
        },
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      body: {
        success: false,
        error: 'Internal server error occurred.',
        details: error?.message,
      },
    };
  }
}

import { normalizeWizardAnswers } from '../domain/estimator/normalizer';
import { calculateProjectEstimate } from '../domain/estimator/pricing/engine';

// -------------------------------------------------------------
// 2. Estimator Calculation Handler
// -------------------------------------------------------------
export function handleEstimateCalculation(answers: Record<string, unknown> = {}) {
  try {
    const requirements = normalizeWizardAnswers(answers || {});
    const estimate = calculateProjectEstimate(requirements);

    return {
      status: 200,
      body: {
        success: true,
        requirements,
        estimate,
      },
    };
  } catch (err: any) {
    console.error('[ALTIA DEV Estimator Engine Error]:', err);
    return {
      status: 500,
      body: {
        success: false,
        error: 'Failed to calculate estimate',
        details: err?.message,
      },
    };
  }
}

// -------------------------------------------------------------
// 3. Estimator Lead Capture & Score Handler
// -------------------------------------------------------------
export async function handleLeadCapture(
  payload: LeadPayload,
  ip = '127.0.0.1',
  userAgent = '',
  env: EnvBindings = {}
) {
  const contact = payload.contact || ({} as LeadContact);
  const answers = payload.answers || {};
  const locale = payload.locale || 'en';

  const name = (contact.name || '').trim();
  const email = (contact.email || '').trim();
  const phone = (contact.phone || '').trim();
  const company = (contact.company || '').trim();

  if (!name || !email || !phone) {
    return {
      status: 422,
      body: {
        success: false,
        error: 'Full name, email, and WhatsApp / phone number are required.',
      },
    };
  }

  const calcRes = handleEstimateCalculation(answers);
  const { requirements, estimate } = calcRes.body as any;

  let score = 50;
  if (company) score += 15;
  if ((estimate?.pricing?.max || estimate?.maxPrice || 0) >= 8000) score += 20;
  if (phone) score += 15;

  const tier = score >= 80 ? 'hot' : score >= 60 ? 'warm' : 'qualified';
  const qualification = {
    score: Math.min(100, score),
    tier,
    recommendedAction: tier === 'hot' ? 'Priority 30-min discovery call' : 'Standard email follow-up',
  };

  const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const leadData = {
    leadId, name, email, phone, company, tier,
    score: Math.min(100, score), estimate, requirements, answers, locale,
  };

  // Build notification promises (caller should waitUntil these)
  const telegramPromise = sendLeadToTelegram(leadData, env);
  const emailPromise = sendLeadEmails(leadData, env);

  return {
    status: 200,
    body: {
      success: true,
      leadId,
      requirements,
      estimate,
      qualification,
    },
    telegramPromise,
    emailPromise,
  };
}

// -------------------------------------------------------------
// 3b. Brevo Emails for Lead (Admin + Client)
// -------------------------------------------------------------
type LeadEmailData = {
  leadId: string; name: string; email: string; phone: string;
  company: string; tier: string; score: number;
  estimate: any; requirements: any; answers: Record<string, unknown>; locale: string;
};

async function sendLeadEmails(lead: LeadEmailData, env: EnvBindings = {}) {
  const apiKey = env.BREVO_API_KEY || (typeof process !== 'undefined' ? process.env.BREVO_API_KEY : undefined);
  const senderEmail = env.BREVO_SENDER_EMAIL || 'website@altia.dev';
  const senderName = env.BREVO_SENDER_NAME || 'ALTIA DEV';
  const receiverEmail = env.CONTACT_RECEIVER_EMAIL || 'hello@altia.dev';

  if (!apiKey) {
    console.log('[Brevo] API key not configured. Lead emails skipped:', lead.leadId);
    return;
  }

  const e = escapeHtml;
  const priceRange = lead.estimate?.pricing
    ? `$${lead.estimate.pricing.min?.toLocaleString()} – $${lead.estimate.pricing.max?.toLocaleString()}`
    : 'N/A';
  const rawMinWeeks = lead.estimate?.timeline?.minWeeks ?? lead.estimate?.timeline?.weeks;
  const rawMaxWeeks = lead.estimate?.timeline?.maxWeeks ?? rawMinWeeks;
  let timelineStr = 'N/A';
  if (typeof rawMinWeeks === 'number' && typeof rawMaxWeeks === 'number') {
    const minW = Math.min(rawMinWeeks, rawMaxWeeks);
    const maxW = Math.max(rawMinWeeks, rawMaxWeeks);
    timelineStr = minW === maxW ? `${minW} weeks` : `${minW} – ${maxW} weeks`;
  } else if (rawMinWeeks) {
    timelineStr = `${rawMinWeeks} weeks`;
  }
  const serviceType = lead.requirements?.service || 'N/A';
  const projectType = (lead.estimate?.projectType || lead.requirements?.projectType || serviceType).replace(/_/g, ' ');
  const complexity = lead.estimate?.complexity?.level || 'medium';
  const solution = lead.estimate?.recommendation?.solution || 'Custom Digital Solution';
  const rationale = lead.estimate?.recommendation?.rationale || '';
  const highlights: string[] = lead.estimate?.highlights || [];
  const assumptions: string[] = lead.estimate?.assumptions || [];
  const nextSteps: string[] = lead.estimate?.nextSteps || [];
  const tierLabel = lead.tier === 'hot' ? '🔥 HOT' : lead.tier === 'warm' ? '🟡 WARM' : '🟢 QUALIFIED';
  const waNumber = '6282147709084';

  // --- Build answers summary ---
  const answerLabels: Record<string, string> = {
    service: 'Service Type', web_project_type: 'Project Type', app_platforms: 'Platforms',
    ai_solution_type: 'AI Solution', scale: 'Scale / Scope', design_level: 'Design Level',
    features: 'Features', integrations: 'Integrations', content_volume: 'Content Volume',
    timeline: 'Timeline Urgency', budget_range: 'Budget Range',
  };
  const answersRows = Object.entries(lead.answers || {})
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .map(([key, val]) => {
      const label = answerLabels[key] || key.replace(/_/g, ' ');
      const value = Array.isArray(val) ? val.join(', ') : String(val);
      return `<tr><td style="padding: 6px 8px; border-bottom: 1px solid #E8DFD3;">${e(label)}</td><td style="padding: 6px 8px; border-bottom: 1px solid #E8DFD3; font-weight: 600;">${e(value)}</td></tr>`;
    }).join('');

  // --- Build highlights / assumptions HTML ---
  const highlightsHtml = highlights.length > 0
    ? highlights.map(h => `<li style="padding: 4px 0;">${e(h)}</li>`).join('')
    : '';
  const assumptionsHtml = assumptions.length > 0
    ? assumptions.map(a => `<li style="padding: 4px 0;">${e(a)}</li>`).join('')
    : '';
  const nextStepsHtml = nextSteps.length > 0
    ? nextSteps.map(s => `<li style="padding: 4px 0;">${e(s)}</li>`).join('')
    : '';

  // ═══════════════════════════════════════════════════════════
  // ADMIN EMAIL (to hello@altia.dev) — includes lead scoring
  // ═══════════════════════════════════════════════════════════
  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; padding: 0; color: #2F2A26;">
      <!-- Header -->
      <div style="background: #2F2A26; padding: 20px 24px; border-radius: 16px 16px 0 0;">
        <h1 style="color: #F5F0E8; margin: 0; font-size: 18px;">New Estimator Lead — ${tierLabel} (Score: ${lead.score}/100)</h1>
      </div>

      <div style="padding: 24px; border: 1px solid #E8DFD3; border-top: none; border-radius: 0 0 16px 16px; background: #FFF6E8;">
        <!-- Contact Info -->
        <h3 style="margin: 0 0 12px; color: #E34234; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Contact Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 6px 8px; font-weight: bold; width: 120px; border-bottom: 1px solid #E8DFD3;">Name</td><td style="padding: 6px 8px; border-bottom: 1px solid #E8DFD3;">${e(lead.name)}</td></tr>
          <tr><td style="padding: 6px 8px; font-weight: bold; border-bottom: 1px solid #E8DFD3;">Email</td><td style="padding: 6px 8px; border-bottom: 1px solid #E8DFD3;"><a href="mailto:${e(lead.email)}" style="color: #E34234;">${e(lead.email)}</a></td></tr>
          <tr><td style="padding: 6px 8px; font-weight: bold; border-bottom: 1px solid #E8DFD3;">Phone</td><td style="padding: 6px 8px; border-bottom: 1px solid #E8DFD3;"><a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="color: #E34234;">${e(lead.phone)}</a></td></tr>
          ${lead.company ? `<tr><td style="padding: 6px 8px; font-weight: bold; border-bottom: 1px solid #E8DFD3;">Company</td><td style="padding: 6px 8px; border-bottom: 1px solid #E8DFD3;">${e(lead.company)}</td></tr>` : ''}
        </table>

        <!-- What they selected -->
        <h3 style="margin: 0 0 12px; color: #E34234; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Form Selections</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">${answersRows}</table>

        <!-- Estimate Result -->
        <div style="background: #2F2A26; border-radius: 12px; padding: 20px; color: #F5F0E8; margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px; color: #E34234; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Project Estimate Result</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #B0A898;">Investment Range</td><td style="padding: 6px 0; font-weight: bold; color: #E34234; font-size: 18px;">${e(priceRange)}</td></tr>
            <tr><td style="padding: 6px 0; color: #B0A898;">Timeline</td><td style="padding: 6px 0; font-weight: bold;">${e(timelineStr)}</td></tr>
            <tr><td style="padding: 6px 0; color: #B0A898;">Complexity</td><td style="padding: 6px 0; font-weight: bold; text-transform: uppercase;">${e(complexity)}</td></tr>
            <tr><td style="padding: 6px 0; color: #B0A898;">Project Type</td><td style="padding: 6px 0; font-weight: bold; text-transform: capitalize;">${e(projectType)}</td></tr>
          </table>
        </div>

        <!-- Recommendation -->
        ${solution ? `
        <div style="padding: 16px; background: #FAF4E9; border-radius: 8px; border-left: 4px solid #E34234; margin-bottom: 16px;">
          <p style="margin: 0 0 4px; font-weight: bold; color: #E34234; font-size: 13px; text-transform: uppercase;">Recommended Approach</p>
          <p style="margin: 0 0 4px; font-weight: bold;">${e(solution)}</p>
          ${rationale ? `<p style="margin: 0; color: #8A8078; font-size: 14px;">${e(rationale)}</p>` : ''}
        </div>` : ''}

        <!-- Highlights -->
        ${highlightsHtml ? `
        <h3 style="margin: 16px 0 8px; font-size: 14px;">Key Architectural Highlights</h3>
        <ul style="margin: 0; padding-left: 20px; color: #2F2A26;">${highlightsHtml}</ul>` : ''}

        <!-- Assumptions -->
        ${assumptionsHtml ? `
        <h3 style="margin: 16px 0 8px; font-size: 14px;">Technical &amp; Commercial Assumptions</h3>
        <ul style="margin: 0; padding-left: 20px; color: #8A8078;">${assumptionsHtml}</ul>` : ''}

        <p style="font-size: 12px; color: #8A8078; margin-top: 24px; border-top: 1px solid #E8DFD3; padding-top: 12px;">
          Lead ID: ${lead.leadId} · Locale: ${lead.locale.toUpperCase()} · ${new Date().toISOString()}
        </p>
      </div>
    </div>
  `;

  // ═══════════════════════════════════════════════════════════
  // CLIENT EMAIL (to lead's email) — professional estimate copy
  // ═══════════════════════════════════════════════════════════
  const clientHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; padding: 0; color: #2F2A26;">
      <!-- Header -->
      <div style="background: #2F2A26; padding: 24px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: #F5F0E8; margin: 0; font-size: 20px;">Your Project Estimate</h1>
        <p style="color: #B0A898; margin: 8px 0 0; font-size: 14px;">from ALTIA DEV · Ref: ${lead.leadId.replace('lead_', '#')}</p>
      </div>

      <div style="padding: 24px; border: 1px solid #E8DFD3; border-top: none; border-radius: 0 0 16px 16px; background: #FFF6E8;">
        <p style="margin: 0 0 20px;">Hi <strong>${e(lead.name)}</strong>, thank you for using our Project Estimator. Here is your calibrated estimate:</p>

        <!-- Estimate Summary Cards -->
        <div style="background: #2F2A26; border-radius: 12px; padding: 20px; color: #F5F0E8; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; text-align: center; width: 33%;">
                <p style="margin: 0; color: #B0A898; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Investment Range</p>
                <p style="margin: 4px 0 0; font-weight: bold; color: #E34234; font-size: 20px;">${e(priceRange)}</p>
              </td>
              <td style="padding: 8px; text-align: center; width: 33%; border-left: 1px solid #444; border-right: 1px solid #444;">
                <p style="margin: 0; color: #B0A898; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Timeline</p>
                <p style="margin: 4px 0 0; font-weight: bold; font-size: 20px;">${e(timelineStr)}</p>
              </td>
              <td style="padding: 8px; text-align: center; width: 33%;">
                <p style="margin: 0; color: #B0A898; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Complexity</p>
                <p style="margin: 4px 0 0; font-weight: bold; font-size: 16px; text-transform: uppercase;">${e(complexity)}</p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Recommendation -->
        ${solution ? `
        <div style="padding: 16px; background: #FAF4E9; border-radius: 8px; border-left: 4px solid #E34234; margin-bottom: 20px;">
          <p style="margin: 0 0 4px; font-weight: bold; color: #E34234; font-size: 12px; text-transform: uppercase;">Recommended Technical Approach</p>
          <p style="margin: 0 0 4px; font-weight: bold; font-size: 15px;">${e(solution)}</p>
          ${rationale ? `<p style="margin: 0; color: #8A8078; font-size: 14px;">${e(rationale)}</p>` : ''}
        </div>` : ''}

        <!-- Highlights & Assumptions side by side -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            ${highlightsHtml ? `<td style="vertical-align: top; padding-right: 10px; width: 50%;">
              <h4 style="margin: 0 0 8px; font-size: 13px; color: #E34234;">Key Highlights</h4>
              <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #2F2A26;">${highlightsHtml}</ul>
            </td>` : ''}
            ${assumptionsHtml ? `<td style="vertical-align: top; padding-left: 10px; width: 50%;">
              <h4 style="margin: 0 0 8px; font-size: 13px; color: #8A8078;">Assumptions</h4>
              <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #8A8078;">${assumptionsHtml}</ul>
            </td>` : ''}
          </tr>
        </table>

        <!-- CTA -->
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ALTIA DEV, I received my project estimate (${lead.leadId.replace('lead_', '#')}). I'd like to discuss next steps.`)}" style="display: inline-block; background: #E34234; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">Book a Discovery Call →</a>
        </div>

        <p style="font-size: 13px; color: #8A8078; text-align: center; margin: 16px 0 0;">
          This estimate is calculated based on your selections and serves as a calibrated planning baseline.<br/>
          Final deliverables, milestone schedules, and commercial terms are agreed during initial discovery.
        </p>

        <p style="font-size: 12px; color: #B0A898; margin-top: 24px; border-top: 1px solid #E8DFD3; padding-top: 12px; text-align: center;">
          ALTIA DEV · Creative Design &amp; AI Engineering Studio · <a href="https://www.altia.dev" style="color: #E34234;">www.altia.dev</a>
        </p>
      </div>
    </div>
  `;

  // Send both emails
  const sendEmail = async (to: {email: string; name: string}, subject: string, html: string, replyTo?: {email: string; name: string}) => {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': apiKey!, 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [to],
          ...(replyTo ? { replyTo } : {}),
          subject,
          htmlContent: html,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error(`[Brevo] Email to ${to.email} failed:`, JSON.stringify(err));
      }
    } catch (err) {
      console.error(`[Brevo] Email to ${to.email} error:`, err);
    }
  };

  await Promise.all([
    // Admin email
    sendEmail(
      { email: receiverEmail, name: 'ALTIA DEV Leads' },
      `[${lead.tier.toUpperCase()} Lead] ${lead.name} — ${projectType} (${priceRange})`,
      adminHtml,
      { email: lead.email, name: lead.name }
    ),
    // Client email
    sendEmail(
      { email: lead.email, name: lead.name },
      `Your Project Estimate from ALTIA DEV — ${priceRange}`,
      clientHtml
    ),
  ]);
}

// -------------------------------------------------------------
// 4. Telegram Lead Notification
// -------------------------------------------------------------
export async function sendLeadToTelegram(
  lead: {
    leadId: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    tier: string;
    score: number;
    estimate: any;
    requirements: any;
    locale: string;
  },
  env: EnvBindings = {}
) {
  const botToken = env.TELEGRAM_BOT_TOKEN || (typeof process !== 'undefined' ? process.env.TELEGRAM_BOT_TOKEN : undefined);
  const chatId = env.TELEGRAM_CHAT_ID || (typeof process !== 'undefined' ? process.env.TELEGRAM_CHAT_ID : undefined);

  if (!botToken || !chatId) {
    console.log('[Telegram] Bot token or chat ID not configured. Lead logged only:', lead.leadId);
    return;
  }

  const tierEmoji = lead.tier === 'hot' ? '🔥' : lead.tier === 'warm' ? '🟡' : '🟢';
  const priceRange = lead.estimate?.pricing
    ? `$${lead.estimate.pricing.min?.toLocaleString()} – $${lead.estimate.pricing.max?.toLocaleString()}`
    : 'N/A';
  const tMin = lead.estimate?.timeline?.minWeeks ?? lead.estimate?.timeline?.weeks;
  const tMax = lead.estimate?.timeline?.maxWeeks ?? tMin;
  let timeline = 'N/A';
  if (typeof tMin === 'number' && typeof tMax === 'number') {
    const minW = Math.min(tMin, tMax);
    const maxW = Math.max(tMin, tMax);
    timeline = minW === maxW ? `${minW} weeks` : `${minW} – ${maxW} weeks`;
  } else if (tMin) {
    timeline = `${tMin} weeks`;
  }
  const serviceType = lead.requirements?.service || 'N/A';
  const scope = lead.requirements?.scope || 'N/A';

  const h = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = [
    `${tierEmoji} <b>New Lead — ${lead.tier.toUpperCase()}</b> (Score: ${lead.score}/100)`,
    '',
    `👤 <b>${h(lead.name)}</b>`,
    `📧 ${h(lead.email)}`,
    `📱 ${h(lead.phone)}`,
    lead.company ? `🏢 ${h(lead.company)}` : '',
    '',
    `🔧 Service: ${h(serviceType)}`,
    `📋 Scope: ${h(scope)}`,
    `💰 Estimate: ${h(priceRange)}`,
    `⏱ Timeline: ${h(timeline)}`,
    `🌐 Locale: ${lead.locale.toUpperCase()}`,
    '',
    `🆔 <code>${lead.leadId}</code>`,
  ].filter(Boolean).join('\n');

  try {
    const resp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    const result = await resp.json() as any;
    if (!result.ok) {
      console.error('[Telegram] API error:', JSON.stringify(result));
    }
  } catch (err) {
    console.error('[Telegram] Failed to send lead notification:', err);
  }
}


function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
