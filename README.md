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

Square の Payment Links（`POST /v2/online-checkout/payment-links` で生成されるリンク）は、Square 公式 Checkout API Guidelines により **single-use** 仕様である。`quick_pay` モード・`order` モードのいずれも 1 人の購入で消費される。

> 出典: <https://developer.squareup.com/docs/checkout-api/guidelines-and-limitations>
>
> "A payment link can only be used to accept payment from a single buyer. This means payment links are not reusable across multiple transactions or customers."

過去に「`quick_pay` は reusable」と誤認した運用が行われ、2026-04-12 / 2026-05-03 / 2026-05-05 / 2026-05-06 と 4 度再発した。本リポジトリでは **API 経由で生成した `quick_pay` / `order` 形式の Payment Link を `lesson-tickets.astro` に埋め込まない**。

### 短期運用ルール（現行）

- `src/pages/lesson-tickets.astro` の `tickets` オブジェクトに埋め込む URL は、**Square Dashboard で「Standard Payment Link」を Reusable 設定で新規作成**したもののみとする
- API 経由（`POST /v2/online-checkout/payment-links` の `quick_pay` / `order` モード）で生成したリンクは公式仕様で single-use のため埋め込み禁止
- Dashboard で生成済みの Reusable Payment Link を **GUI で「編集」または「コピーで作成」しない**（single-use 化する事象を観測）。修正必要時は新規 Reusable Payment Link を作成して URL を置換する

### 中長期方針（移行先）

公開チケット販売ページからの static URL 埋め込みを廃止し、Cloudflare Worker で購入ボタン押下のたびに `CreatePaymentLink` (`quick_pay`) を都度発行して redirect する方式へ移行する。

- フロントの購入ボタン → Worker の `POST /api/create-checkout` 呼び出し
- Worker が Square `CreatePaymentLink` を都度発行し、redirect URL を返す
- Square Production Access Token は Worker のシークレットでのみ保持（フロントに出さない）
- クライアントから価格は受け取らず、SKU をキーにサーバー側固定マスタから金額を引く
- `idempotency_key` は 1 購入試行ごとに一意。同一リトライではキーを引き継ぐ
- 429 / 一時失敗は exponential backoff + jitter
- `redirect_url` は完了表示用に限定し、決済確定の判定は Square Webhook / Payments API / Orders API で行う

中長期移行の設計・実装は別 PR・別チケットで進める。

### Square API アクセス権限ポリシー（2026-05-05 確立）

**Square Production Access Token の利用権限は NOBU のみ**。Lumi / Claude Code / その他エージェントには Token を渡さない。Token を要する作業は NOBU の Mac で NOBU が手動実行する形のみ許容する。

過去経緯:

- 2026-04-12: single-use 由来の決済バグ初発 → 2026-04-20 全32リンク再生成（`quick_pay` 誤認のまま）
- 2026-05-03: 同症状再認識・`fix/payments-reusable-checkout-2026-05-03` (PR #6) 起票も保留、NOBU 未エスカレーション
- 2026-05-05: NOBU が顧客視点で再発を確認 → Production Access Token を Replace（旧 Token 無効化）→ PR #7 で `quick_pay` 再生成（**誤った対応のまま本番反映**）
- 2026-05-06: 公式 Checkout API Guidelines を一次確認し、`quick_pay` 含む全 Payment Links が single-use と確定。再生成スクリプトを削除し、本ルールに改訂
