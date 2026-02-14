import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://designwith.care',
  output: 'static',
  integrations: [tailwind()],
});
