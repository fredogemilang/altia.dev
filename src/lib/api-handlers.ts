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

  // Send lead notification to Telegram
  await sendLeadToTelegram({
    leadId,
    name,
    email,
    phone,
    company,
    tier,
    score: Math.min(100, score),
    estimate,
    requirements,
    locale,
  }, env);

  return {
    status: 200,
    body: {
      success: true,
      leadId,
      requirements,
      estimate,
      qualification,
    },
  };
}

// -------------------------------------------------------------
// 4. Telegram Lead Notification
// -------------------------------------------------------------
async function sendLeadToTelegram(
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

  const message = [
    `${tierEmoji} *New Lead — ${lead.tier.toUpperCase()}* (Score: ${lead.score}/100)`,
    '',
    `👤 *${escapeMarkdown(lead.name)}*`,
    `📧 ${escapeMarkdown(lead.email)}`,
    `📱 ${escapeMarkdown(lead.phone)}`,
    lead.company ? `🏢 ${escapeMarkdown(lead.company)}` : '',
    '',
    `🔧 Service: ${escapeMarkdown(serviceType)}`,
    `📋 Scope: ${escapeMarkdown(scope)}`,
    `💰 Estimate: ${escapeMarkdown(priceRange)}`,
    `⏱ Timeline: ${escapeMarkdown(timeline)}`,
    `🌐 Locale: ${lead.locale.toUpperCase()}`,
    '',
    `🆔 \`${lead.leadId}\``,
  ].filter(Boolean).join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error('[Telegram] Failed to send lead notification:', err);
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
