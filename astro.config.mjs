// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

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

    // カニバリゼーション解消301リダイレクト (Olivia設計 cannibalization-and-internal-links.md 準拠)
    // TOK系: ピラー記事 /tok-essay-high-score-techniques/ に集約
    '/tok-tips-high-score/': '/tok-essay-high-score-techniques/',
    '/tok-high-score-tips/': '/tok-essay-high-score-techniques/',
    '/tok-essay-5-tips-ib-tutor/': '/tok-essay-high-score-techniques/',
    // TOK入門: ピラー記事 /ib-tok-explained/ に集約
    '/what-is-tok/': '/ib-tok-explained/',
    '/ib-tok-success-guide/': '/ib-tok-explained/',
    // EE系: ピラー記事 /extended-essay-ee-theme-selection-writing-guide/ に集約
    '/ib-ee-topic-selection/': '/extended-essay-ee-theme-selection-writing-guide/',
    '/ib-ee-topic-selection-guide/': '/extended-essay-ee-theme-selection-writing-guide/',
    '/extended-essay-5-steps-high-score/': '/extended-essay-ee-theme-selection-writing-guide/',
    // EE入門: ピラー記事 /ib-ee-explained/ に集約
    '/extended-essay-guide/': '/ib-ee-explained/',
    // 保護者記事統合
    '/ib-tutor-difficulty-truth-parents-guide/': '/ib-tutor-difficulty-reality-parents-guide/',
  },

  integrations: [sitemap()],
});