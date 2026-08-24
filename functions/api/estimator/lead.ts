import { handleLeadCapture, type LeadPayload, type EnvBindings } from '../../../src/lib/api-handlers';
import { corsHeaders, corsPreflightHeaders } from '../_cors';

interface EventContext<Env, P extends string, Data> {
  request: Request;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  waitUntil: (promise: Promise<any>) => void;
}

export async function onRequestPost(context: EventContext<EnvBindings, string, any>) {
  try {
    const payload = (await context.request.json().catch(() => ({}))) as LeadPayload;
    const clientIp = context.request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const userAgent = context.request.headers.get('user-agent') || '';

    const result = await handleLeadCapture(payload, clientIp, userAgent, context.env);

    return new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: corsHeaders(context.request),
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process lead capture',
        details: error?.message,
      }),
      {
        status: 400,
        headers: corsHeaders(context.request),
      }
    );
  }
}

export async function onRequestOptions(context: EventContext<any, string, any>) {
  return new Response(null, {
    status: 204,
    headers: corsPreflightHeaders(context.request),
  });
}
