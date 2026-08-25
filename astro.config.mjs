import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://altia.dev',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    plugins: [
      {
        name: 'vite-plugin-local-api-handlers',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url?.startsWith('/api/')) {
              return next();
            }

            const url = new URL(req.url, `http://${req.headers.host}`);
            const pathname = url.pathname;

            if (req.method === 'OPTIONS') {
              res.statusCode = 204;
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');
              return res.end();
            }

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Health check
            if (pathname === '/api/health' || pathname === '/api') {
              res.statusCode = 200;
              return res.end(
                JSON.stringify({
                  status: 'ok',
                  service: 'ALTIA DEV Local Dev API Server',
                  runtime: 'Node.js / Vite Middleware',
                  timestamp: new Date().toISOString(),
                })
              );
            }

            // Read request body for POST
            if (req.method === 'POST') {
              let rawBody = '';
              req.on('data', (chunk) => {
                rawBody += chunk;
              });

              req.on('end', async () => {
                try {
                  const body = rawBody ? JSON.parse(rawBody) : {};

                  // Dynamic import to support hot-reloading of handlers
                  const {
                    handleContactSubmission,
                    handleEstimateCalculation,
                    handleLeadCapture,
                  } = await server.ssrLoadModule('/src/lib/api-handlers.ts');

                  if (pathname === '/api/contact') {
                    const result = await handleContactSubmission(body);
                    res.statusCode = result.status;
                    return res.end(JSON.stringify(result.body));
                  }

                  if (pathname === '/api/estimator/estimate') {
                    const result = handleEstimateCalculation(body.answers || {});
                    res.statusCode = result.status;
                    return res.end(JSON.stringify(result.body));
                  }

                  if (pathname === '/api/estimator/lead') {
                    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
                    const userAgent = req.headers['user-agent'] || '';
                    const result = handleLeadCapture(body, clientIp, userAgent);
                    res.statusCode = result.status;
                    return res.end(JSON.stringify(result.body));
                  }

                  res.statusCode = 404;
                  return res.end(JSON.stringify({ success: false, error: `Endpoint not found: ${pathname}` }));
                } catch (err) {
                  res.statusCode = 500;
                  return res.end(JSON.stringify({ success: false, error: err?.message || 'Server error' }));
                }
              });
              return;
            }

            res.statusCode = 404;
            return res.end(JSON.stringify({ success: false, error: `Method not allowed: ${req.method}` }));
          });
        },
      },
    ],
    ssr: {
      noExternal: ['gsap', 'cobe', 'lenis', 'clsx', 'tailwind-merge', 'lucide-react'],
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
