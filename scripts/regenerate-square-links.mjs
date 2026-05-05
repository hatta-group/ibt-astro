#!/usr/bin/env node
// =============================================================================
// Square Payment Links 再生成スクリプト（IBT 32商品・quick_pay reusable モード）
// =============================================================================
//
// 用途:
//   IBT 店舗（L8KYMVQVW2MWP）の Payment Links を quick_pay モード（reusable）で
//   一括再生成し、src/pages/lesson-tickets.astro の tickets オブジェクトを更新する。
//
// 背景:
//   Square Dashboard の GUI でリンクを編集 or 「コピーで作成」を行うと
//   reusable で作ったリンクが single-use 化する事故が発生（2026-04-12 / 05-03 / 05-05）。
//   再発時は本スクリプトを実行して全リンク再生成する。
//
// セキュリティ:
//   - SQUARE_ACCESS_TOKEN は .env.local から読込（リポジトリにコミットしない）
//   - Token は NOBU パスワードマネージャーで管理（Lumi/Claude Code には渡さない）
//   - 利用権限: NOBU のみ
//   - 本スクリプト実行は NOBU の Mac の通常ターミナルで NOBU が手動実行する
//
// 実行手順:
//   1. NOBU の Mac で:
//        cd ~/projects/ibt-astro
//        echo "SQUARE_ACCESS_TOKEN=<新Token>" > .env.local
//        node scripts/regenerate-square-links.mjs
//   2. 実行後、git diff で URL 差し替えを確認
//   3. PR 作成 → squash merge → Cloudflare Pages 自動デプロイ
//   4. シークレットウィンドウで任意1リンクの動作確認（カード入力画面が表示されること）
//
// 関連:
//   - 過去事例: 2026-04-12 早織さん事例 / 2026-04-20 PR a956a2a で対応
//   - 仕様: https://developer.squareup.com/reference/square/checkout-api/create-payment-link
//   - quick_pay は reusable・order ブロックは single-use（quick_pay 必須）
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const ASTRO_FILE = resolve(REPO_ROOT, 'src/pages/lesson-tickets.astro');
const ENV_FILE = resolve(REPO_ROOT, '.env.local');

// IBT 店舗の Square Location ID（GRISTA / HATTAFUND は触らない）
const LOCATION_ID = 'L8KYMVQVW2MWP';

// 商品マスタ（program-format -> {count, price}[] / 価格は税込円）
// lesson-tickets.astro の tickets と一致させる
const PRODUCTS = {
  'pyp-online': [
    { count: 1, price: 4840 },
    { count: 4, price: 19250 },
    { count: 8, price: 38500 },
    { count: 12, price: 57750 },
    { count: 16, price: 77000 },
  ],
  'pyp-inperson': [
    { count: 1, price: 5258 },
    { count: 4, price: 20900 },
    { count: 8, price: 41800 },
    { count: 12, price: 62700 },
    { count: 16, price: 83600 },
  ],
  'myp-online': [
    { count: 1, price: 6050 },
    { count: 4, price: 24090 },
    { count: 8, price: 48180 },
    { count: 12, price: 72270 },
    { count: 16, price: 93630 },
  ],
  'myp-inperson': [
    { count: 1, price: 6468 },
    { count: 4, price: 25740 },
    { count: 8, price: 51480 },
    { count: 12, price: 77220 },
    { count: 16, price: 102960 },
  ],
  'dp-online': [
    { count: 1, price: 7260 },
    { count: 4, price: 28930 },
    { count: 8, price: 57860 },
    { count: 12, price: 86790 },
    { count: 16, price: 115720 },
  ],
  'dp-inperson': [
    { count: 1, price: 7678 },
    { count: 4, price: 30580 },
    { count: 8, price: 61160 },
    { count: 12, price: 91740 },
    { count: 16, price: 122320 },
  ],
  'individual-online': [
    { count: 1, price: 3300 },
    { count: 4, price: 12870 },
  ],
};

// プログラム名・形式の表示文字列（Square 商品名生成用）
const PROGRAM_DISPLAY = { pyp: 'PYP', myp: 'MYP', dp: 'DP', individual: 'IB Individual' };
const FORMAT_DISPLAY = { online: 'オンライン', inperson: '対面' };
const DURATION_MIN = { pyp: 50, myp: 50, dp: 50, individual: 30 };

function loadAccessToken() {
  let token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) {
    try {
      const env = readFileSync(ENV_FILE, 'utf8');
      const match = env.match(/^SQUARE_ACCESS_TOKEN\s*=\s*(.+?)\s*$/m);
      if (match) token = match[1].replace(/^["']|["']$/g, '');
    } catch (_) {}
  }
  if (!token) {
    console.error('❌ SQUARE_ACCESS_TOKEN not found.');
    console.error('   .env.local に SQUARE_ACCESS_TOKEN=<token> を設定するか、');
    console.error('   環境変数で渡してください: SQUARE_ACCESS_TOKEN=xxx node scripts/regenerate-square-links.mjs');
    process.exit(1);
  }
  return token;
}

function buildName(programFormat, count) {
  const [program, format] = programFormat.split('-');
  const min = DURATION_MIN[program];
  return `${PROGRAM_DISPLAY[program]} ${FORMAT_DISPLAY[format]} (${min}分×${count}回分)`;
}

async function createPaymentLink({ token, name, priceYen }) {
  const res = await fetch('https://connect.squareup.com/v2/online-checkout/payment-links', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Square-Version': '2025-04-16',
    },
    body: JSON.stringify({
      idempotency_key: randomUUID(),
      quick_pay: {
        name,
        price_money: { amount: priceYen, currency: 'JPY' },
        location_id: LOCATION_ID,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Square API error (${res.status}): ${JSON.stringify(data.errors || data)}`);
  }
  return data.payment_link.url;
}

function buildTicketsBlock(generated) {
  const lines = [];
  lines.push("    const tickets: Record<string, { count: number; price: number; url: string }[]> = {");
  for (const [key, items] of Object.entries(generated)) {
    lines.push(`      '${key}': [`);
    for (const it of items) {
      lines.push(`        { count: ${it.count}, price: ${it.price}, url: '${it.url}' },`);
    }
    lines.push("      ],");
  }
  lines.push("    };");
  return lines.join('\n');
}

function updateAstroFile(generated) {
  const content = readFileSync(ASTRO_FILE, 'utf8');
  const startMarker = "    const tickets: Record<string, { count: number; price: number; url: string }[]> = {";
  const start = content.indexOf(startMarker);
  if (start === -1) throw new Error('tickets オブジェクトの開始位置が見つかりません');
  // startMarker の最後の `{` が代入先オブジェクトの開始（depth=1）。
  // ここから探索すると Record<string, { ... }[]> 型注釈内の `{` `}` を誤カウントしない。
  let depth = 1;
  let i = start + startMarker.length;
  while (i < content.length) {
    const ch = content[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        if (content[i + 1] === ';') i++;
        break;
      }
    }
    i++;
  }
  if (depth !== 0) throw new Error('tickets オブジェクトの閉じ括弧が見つかりません');
  const before = content.slice(0, start);
  const after = content.slice(i + 1);
  const newContent = before + buildTicketsBlock(generated) + after;
  writeFileSync(ASTRO_FILE, newContent);
}

async function main() {
  console.log('🔐 Loading SQUARE_ACCESS_TOKEN...');
  const token = loadAccessToken();
  console.log(`📍 Location: ${LOCATION_ID} (IBT only / GRISTA・HATTAFUND は触らない)`);

  const total = Object.values(PRODUCTS).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`🚀 Generating ${total} payment links (quick_pay / reusable mode)...`);
  console.log('');

  const generated = {};
  let counter = 0;
  for (const [key, items] of Object.entries(PRODUCTS)) {
    generated[key] = [];
    for (const it of items) {
      counter++;
      const name = buildName(key, it.count);
      process.stdout.write(`  [${counter}/${total}] ${name} (¥${it.price.toLocaleString()}) ... `);
      try {
        const url = await createPaymentLink({ token, name, priceYen: it.price });
        console.log(url);
        generated[key].push({ ...it, url });
      } catch (e) {
        console.log('❌ FAILED');
        console.error(`     ${e.message}`);
        process.exit(1);
      }
    }
  }

  console.log('');
  console.log('📝 Updating src/pages/lesson-tickets.astro...');
  updateAstroFile(generated);
  console.log('✅ Done. Review changes with `git diff src/pages/lesson-tickets.astro`.');
  console.log('');
  console.log('次のステップ:');
  console.log('  1. git diff src/pages/lesson-tickets.astro で URL 差し替え確認');
  console.log('  2. シークレットウィンドウで任意1リンクの動作確認（カード入力画面が表示されればOK）');
  console.log('  3. PR 作成 → マージ → Cloudflare Pages デプロイ');
  console.log('');
  console.log('⚠️  作業後は本ファイルの SQUARE_ACCESS_TOKEN を含む .env.local の取扱注意。');
  console.log('    リポジトリには .gitignore で除外されているが、ローカル削除推奨。');
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
