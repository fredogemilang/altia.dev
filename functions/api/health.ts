export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      status: 'ok',
      service: 'ALTIA DEV Cloudflare Pages Edge API',
      runtime: 'Cloudflare Pages Functions (V8 Edge)',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
