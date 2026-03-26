// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ib-tutors.net',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  },
  redirects: {
    // 旧URL → 新URL (WordPress時代のリダイレクト移植)
    '/courses/': '/lessons-pricing/',
    '/price/': '/lessons-pricing/',
    '/お問い合わせ/': '/contact/',
    '/privacy-policy/': '/legal/',
    '/iber-shindan/': '/iber-type-shindan/',

    // カニバリゼーション解消301リダイレクト (Olivia設定 2026-03-25)
    '/tok-high-score-tips/': '/tok-tips-high-score/',
    '/tok-essay-high-score-techniques/': '/tok-tips-high-score/',
    '/tok-essay-5-tips-ib-tutor/': '/tok-tips-high-score/',
    '/what-is-tok/': '/ib-tok-explained/',
    '/ib-tok-success-guide/': '/ib-tok-explained/',
    '/ib-ee-topic-selection/': '/ib-ee-topic-selection-guide/',
    '/extended-essay-5-steps-high-score/': '/ib-ee-topic-selection-guide/',
    '/extended-essay-ee-theme-selection-writing-guide/': '/ib-ee-topic-selection-guide/',
    '/extended-essay-guide/': '/ib-ee-explained/',
    '/ib-tutor-difficulty-truth-parents-guide/': '/ib-tutor-difficulty-reality-parents-guide/',
  },
});
