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
    // サイトマップ正規化
    '/sitemap.xml': '/sitemap-index.xml',

    // 旧URL → 新URL (WordPress時代のリダイレクト移植)
    '/courses/': '/lessons-pricing/',
    '/price/': '/lessons-pricing/',
    '/お問い合わせ/': '/contact/',
    '/privacy-policy/': '/legal/',
    '/iber-shindan/': '/iber-type-shindan/',

    // カニバリゼーション解消301リダイレクト (Olivia設計 cannibalization-and-internal-links.md 準拠)
    // TOK系: ピラー記事 /blog/tok-essay-high-score-techniques/ に集約
    '/tok-tips-high-score/': '/blog/tok-essay-high-score-techniques/',
    '/tok-high-score-tips/': '/blog/tok-essay-high-score-techniques/',
    '/tok-essay-5-tips-ib-tutor/': '/blog/tok-essay-high-score-techniques/',
    // TOK入門: ピラー記事 /blog/ib-tok-explained/ に集約
    '/what-is-tok/': '/blog/ib-tok-explained/',
    '/ib-tok-success-guide/': '/blog/ib-tok-explained/',
    // EE系: ピラー記事 /blog/extended-essay-ee-theme-selection-writing-guide/ に集約
    '/ib-ee-topic-selection/': '/blog/extended-essay-ee-theme-selection-writing-guide/',
    '/ib-ee-topic-selection-guide/': '/blog/extended-essay-ee-theme-selection-writing-guide/',
    '/extended-essay-5-steps-high-score/': '/blog/extended-essay-ee-theme-selection-writing-guide/',
    // EE入門: ピラー記事 /blog/ib-ee-explained/ に集約
    '/extended-essay-guide/': '/blog/ib-ee-explained/',
    // 保護者記事統合
    '/ib-tutor-difficulty-truth-parents-guide/': '/blog/ib-tutor-difficulty-reality-parents-guide/',
  },

  integrations: [
    sitemap({
      filter: (page) =>
        ![
          'https://ib-tutors.net/legal/',
          'https://ib-tutors.net/privacy/',
          'https://ib-tutors.net/lesson-tickets/',
          'https://ib-tutors.net/my-account/',
          'https://ib-tutors.net/404/',
          'https://ib-tutors.net/search/',
        ].includes(page),
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});