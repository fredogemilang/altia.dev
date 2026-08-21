import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
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
