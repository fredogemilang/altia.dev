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
    score: Math.min(100, score), estimate, requirements, locale,
  };

  // Build notification promises (caller should waitUntil these)
  const telegramPromise = sendLeadToTelegram(leadData, env);
  const emailPromise = sendLeadEmail(leadData, env);

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
// 3b. Brevo Email for Lead Notification
// -------------------------------------------------------------
async function sendLeadEmail(
  lead: {
    leadId: string; name: string; email: string; phone: string;
    company: string; tier: string; score: number;
    estimate: any; requirements: any; locale: string;
  },
  env: EnvBindings = {}
) {
  const apiKey = env.BREVO_API_KEY || (typeof process !== 'undefined' ? process.env.BREVO_API_KEY : undefined);
  const senderEmail = env.BREVO_SENDER_EMAIL || 'website@altia.dev';
  const senderName = env.BREVO_SENDER_NAME || 'ALTIA DEV';
  const receiverEmail = env.CONTACT_RECEIVER_EMAIL || 'hello@altia.dev';

  if (!apiKey) {
    console.log('[Brevo] API key not configured. Lead email skipped:', lead.leadId);
    return;
  }

  const tierLabel = lead.tier === 'hot' ? '🔥 HOT' : lead.tier === 'warm' ? '🟡 WARM' : '🟢 QUALIFIED';
  const priceRange = lead.estimate?.pricing
    ? `$${lead.estimate.pricing.min?.toLocaleString()} – $${lead.estimate.pricing.max?.toLocaleString()}`
    : 'N/A';
  const timeline = lead.estimate?.timeline?.weeks ? `${lead.estimate.timeline.weeks} weeks` : 'N/A';
  const serviceType = lead.requirements?.service || 'N/A';
  const scope = lead.requirements?.scope || 'N/A';
  const e = escapeHtml;

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E8DFD3; border-radius: 16px; background-color: #FFF6E8; color: #2F2A26;">
      <h2 style="color: #E34234; margin-top: 0; font-size: 20px;">New Estimator Lead — ${tierLabel} (Score: ${lead.score}/100)</h2>

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${e(lead.name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${e(lead.email)}" style="color: #E34234;">${e(lead.email)}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td><a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="color: #E34234;">${e(lead.phone)}</a></td></tr>
        ${lead.company ? `<tr><td style="padding: 8px 0; font-weight: bold;">Company</td><td>${e(lead.company)}</td></tr>` : ''}
      </table>

      <div style="margin-top: 16px; padding: 16px; background: #FAF4E9; border-radius: 8px; border-left: 4px solid #E34234;">
        <p style="margin: 0 0 8px; font-weight: bold;">Project Requirements</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 4px 0;">Service</td><td style="font-weight: bold;">${e(serviceType)}</td></tr>
          <tr><td style="padding: 4px 0;">Scope</td><td style="font-weight: bold;">${e(scope)}</td></tr>
          <tr><td style="padding: 4px 0;">Investment Range</td><td style="font-weight: bold; color: #E34234;">${e(priceRange)}</td></tr>
          <tr><td style="padding: 4px 0;">Timeline</td><td style="font-weight: bold;">${e(timeline)}</td></tr>
        </table>
      </div>

      <p style="font-size: 12px; color: #8A8078; margin-top: 24px; border-top: 1px solid #E8DFD3; padding-top: 12px;">
        Lead ID: ${lead.leadId} · Locale: ${lead.locale.toUpperCase()} · ${new Date().toLocaleString()}
      </p>
    </div>
  `;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: receiverEmail, name: 'ALTIA DEV Leads' }],
        replyTo: { email: lead.email, name: lead.name },
        subject: `[${lead.tier.toUpperCase()} Lead] ${lead.name} — ${serviceType} (${priceRange})`,
        htmlContent,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[Brevo] Lead email failed:', JSON.stringify(err));
    }
  } catch (err) {
    console.error('[Brevo] Lead email error:', err);
  }
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
  const timeline = lead.estimate?.timeline?.weeks
    ? `${lead.estimate.timeline.weeks} weeks`
    : 'N/A';
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
