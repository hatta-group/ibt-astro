# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 決済リンク運用ルール

Squareチケット決済リンクを新規作成・再生成する際は、必ず **quick_pay（reusable）モード** で生成すること。
single-use モードのリンクを埋め込むと、1人目の決済完了後に2人目以降が過去の決済完了画面にリダイレクトされ、
新規購入者がカード入力画面に到達できない決済バグが発生する（2026-04-12事例あり）。

### 生成方法

- Square Dashboard（GUI）: 「Payment Links」作成時に「複数回使用可能」を選択
- Payment Links API: `POST /v2/online-checkout/payment-links` に **`quick_pay`** ブロックを指定
  - `order` ブロックを使うと single-use になるため **使用しない**

### 埋込先

`src/pages/lesson-tickets.astro` 内の `tickets` オブジェクト（program/format別にURL配列）

### 再生成時の手順

1. NOBU の Mac の通常ターミナルで:
   ```bash
   cd ~/projects/ibt-astro
   echo "SQUARE_ACCESS_TOKEN=<新Token>" > .env.local
   node scripts/regenerate-square-links.mjs
   ```
2. `git diff src/pages/lesson-tickets.astro` で URL 差し替え確認
3. シークレットウィンドウで任意1リンクの動作確認（カード入力画面が表示されればOK）
4. PR作成→NOBU承認→マージ→Cloudflare Pages自動デプロイ
5. 本番で任意のチケット1件の遷移を目視確認

### Square API アクセス権限ポリシー（2026-05-05 確立）

**Square Production Access Token の利用権限は NOBU のみ**。Lumi / Claude Code / その他エージェントには Token を渡さない。理由:

- 2026-04-12: 早織さん事例で single-use 由来の決済バグ発生 → 2026-04-20 PR `a956a2a` で全32リンク再生成
- 2026-05-03: `fix/payments-reusable-checkout-2026-05-03` ブランチで再発が認識されたが「スコープ外」として保留・NOBU 未エスカレーション
- 2026-05-05: NOBU が再発を発見・Lumi の Square API アクセス遮断を決定 → 既存 Production Access Token を Replace（旧 Token 無効化）

このため、本リポジトリの `scripts/regenerate-square-links.mjs` 実行は **NOBU の Mac で NOBU が手動実行** する形のみ許容する。Lumi / Claude Code が Token を取得・利用してはならない。

### Square Dashboard の GUI 操作禁止事項

quick_pay（reusable）で API 生成したリンクが **Square Dashboard の GUI で「編集」「コピーで作成」を実行すると single-use 化** する事象を観測。Dashboard では生成済みリンクの **編集・コピー操作を行わない**。修正が必要な場合は本スクリプトで全32リンク再生成する。
