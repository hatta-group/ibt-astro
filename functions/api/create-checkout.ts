// =============================================================================
// POST /api/create-checkout — Cloudflare Pages Function
// =============================================================================
// 購入ボタン押下のたびに Square CreatePaymentLink (quick_pay) を都度発行し、
// redirect 先 URL を返す。
//
// Square 公式 Checkout API Guidelines:
//   "A payment link can only be used to accept payment from a single buyer.
//    This means payment links are not reusable across multiple transactions
//    or customers."
//   https://developer.squareup.com/docs/checkout-api/guidelines-and-limitations
//
// 各リンクは single-use 仕様だが、購入のたびに新規リンクを発行することで
// 「同じ商品ボタンを複数人が連続購入できる」状態を構造的に担保する。
//
// セキュリティ:
//   - SQUARE_ACCESS_TOKEN は Cloudflare Pages の environment secret
//   - クライアントから価格は受け取らず、SKU マスタから固定値を引く
//   - SKU は厳密にホワイトリスト一致のみ受理
// =============================================================================

interface Env {
  SQUARE_ACCESS_TOKEN: string;
}

interface CreateCheckoutRequest {
  skuId?: unknown;
  idempotencyKey?: unknown;
}

// @cloudflare/workers-types に依存しないための簡易型定義。
// Cloudflare Pages Functions の onRequest* シグネチャはこの形に一致する。
type PagesFunction<E = Record<string, unknown>> = (context: {
  request: Request;
  env: E;
}) => Promise<Response> | Response;

const SQUARE_API = 'https://connect.squareup.com/v2/online-checkout/payment-links';
const SQUARE_VERSION = '2025-04-16';
const LOCATION_ID = 'L8KYMVQVW2MWP'; // IBT 店舗のみ。GRISTA / HATTAFUND は触らない

const MAX_RETRIES = 3;
const BASE_BACKOFF_MS = 200;
const REQUEST_TIMEOUT_MS = 15_000;

const IDEMPOTENCY_KEY_RE = /^[A-Za-z0-9_-]{16,128}$/;

// -----------------------------------------------------------------------------
// SKU マスタ — サーバー側固定値。クライアントから価格を受け取らない。
// -----------------------------------------------------------------------------
type SkuRecord = { name: string; priceYen: number };

const SKU_MASTER: Record<string, SkuRecord> = {
  // PYP オンライン (50分)
  'pyp-online-1': { name: 'PYP オンライン (50分×1回分)', priceYen: 4840 },
  'pyp-online-4': { name: 'PYP オンライン (50分×4回分)', priceYen: 19250 },
  'pyp-online-8': { name: 'PYP オンライン (50分×8回分)', priceYen: 38500 },
  'pyp-online-12': { name: 'PYP オンライン (50分×12回分)', priceYen: 57750 },
  'pyp-online-16': { name: 'PYP オンライン (50分×16回分)', priceYen: 77000 },

  // PYP 対面 (50分)
  'pyp-inperson-1': { name: 'PYP 対面 (50分×1回分)', priceYen: 5258 },
  'pyp-inperson-4': { name: 'PYP 対面 (50分×4回分)', priceYen: 20900 },
  'pyp-inperson-8': { name: 'PYP 対面 (50分×8回分)', priceYen: 41800 },
  'pyp-inperson-12': { name: 'PYP 対面 (50分×12回分)', priceYen: 62700 },
  'pyp-inperson-16': { name: 'PYP 対面 (50分×16回分)', priceYen: 83600 },

  // MYP オンライン (50分)
  'myp-online-1': { name: 'MYP オンライン (50分×1回分)', priceYen: 6050 },
  'myp-online-4': { name: 'MYP オンライン (50分×4回分)', priceYen: 24090 },
  'myp-online-8': { name: 'MYP オンライン (50分×8回分)', priceYen: 48180 },
  'myp-online-12': { name: 'MYP オンライン (50分×12回分)', priceYen: 72270 },
  'myp-online-16': { name: 'MYP オンライン (50分×16回分)', priceYen: 93630 },

  // MYP 対面 (50分)
  'myp-inperson-1': { name: 'MYP 対面 (50分×1回分)', priceYen: 6468 },
  'myp-inperson-4': { name: 'MYP 対面 (50分×4回分)', priceYen: 25740 },
  'myp-inperson-8': { name: 'MYP 対面 (50分×8回分)', priceYen: 51480 },
  'myp-inperson-12': { name: 'MYP 対面 (50分×12回分)', priceYen: 77220 },
  'myp-inperson-16': { name: 'MYP 対面 (50分×16回分)', priceYen: 102960 },

  // DP オンライン (50分)
  'dp-online-1': { name: 'DP オンライン (50分×1回分)', priceYen: 7260 },
  'dp-online-4': { name: 'DP オンライン (50分×4回分)', priceYen: 28930 },
  'dp-online-8': { name: 'DP オンライン (50分×8回分)', priceYen: 57860 },
  'dp-online-12': { name: 'DP オンライン (50分×12回分)', priceYen: 86790 },
  'dp-online-16': { name: 'DP オンライン (50分×16回分)', priceYen: 115720 },

  // DP 対面 (50分)
  'dp-inperson-1': { name: 'DP 対面 (50分×1回分)', priceYen: 7678 },
  'dp-inperson-4': { name: 'DP 対面 (50分×4回分)', priceYen: 30580 },
  'dp-inperson-8': { name: 'DP 対面 (50分×8回分)', priceYen: 61160 },
  'dp-inperson-12': { name: 'DP 対面 (50分×12回分)', priceYen: 91740 },
  'dp-inperson-16': { name: 'DP 対面 (50分×16回分)', priceYen: 122320 },

  // IB Individual オンライン (30分)
  'individual-online-1': { name: 'IB Individual オンライン (30分×1回分)', priceYen: 3300 },
  'individual-online-4': { name: 'IB Individual オンライン (30分×4回分)', priceYen: 12870 },
};

// -----------------------------------------------------------------------------
// Pages Function ハンドラ
// -----------------------------------------------------------------------------
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.SQUARE_ACCESS_TOKEN) {
    return jsonResponse(500, { error: 'server_misconfigured' });
  }

  let body: CreateCheckoutRequest;
  try {
    body = (await request.json()) as CreateCheckoutRequest;
  } catch {
    return jsonResponse(400, { error: 'invalid_body' });
  }

  const skuId = typeof body.skuId === 'string' ? body.skuId : '';
  const idempotencyKey = typeof body.idempotencyKey === 'string' ? body.idempotencyKey : '';

  const sku = SKU_MASTER[skuId];
  if (!sku) {
    return jsonResponse(400, { error: 'invalid_sku' });
  }
  if (!IDEMPOTENCY_KEY_RE.test(idempotencyKey)) {
    return jsonResponse(400, { error: 'invalid_idempotency_key' });
  }

  const payload = {
    idempotency_key: idempotencyKey,
    quick_pay: {
      name: sku.name,
      price_money: { amount: sku.priceYen, currency: 'JPY' },
      location_id: LOCATION_ID,
    },
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const result = await callSquareApi(env.SQUARE_ACCESS_TOKEN, payload);

    if (result.kind === 'success') {
      return jsonResponse(200, { url: result.url });
    }

    if (result.kind === 'retryable' && attempt < MAX_RETRIES - 1) {
      await sleep(jitter(BASE_BACKOFF_MS * Math.pow(2, attempt)));
      continue;
    }

    if (result.kind === 'client_error') {
      return jsonResponse(502, { error: 'square_api_error' });
    }

    // last attempt failed (retryable exhausted) or unknown error
    return jsonResponse(503, { error: 'square_api_unavailable' });
  }

  return jsonResponse(503, { error: 'square_api_unavailable' });
};

// -----------------------------------------------------------------------------
// Square API 呼び出し
// -----------------------------------------------------------------------------
type SquareCallResult =
  | { kind: 'success'; url: string }
  | { kind: 'retryable' } // 429 / 5xx / network error
  | { kind: 'client_error' } // 4xx (non-429)
  | { kind: 'malformed_response' };

async function callSquareApi(token: string, payload: unknown): Promise<SquareCallResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(SQUARE_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Square-Version': SQUARE_VERSION,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (res.ok) {
      let data: any;
      try {
        data = await res.json();
      } catch {
        return { kind: 'malformed_response' };
      }
      const url = data?.payment_link?.url;
      if (typeof url !== 'string' || !/^https:\/\//.test(url)) {
        return { kind: 'malformed_response' };
      }
      return { kind: 'success', url };
    }

    if (res.status === 429 || res.status >= 500) {
      return { kind: 'retryable' };
    }

    return { kind: 'client_error' };
  } catch {
    // network error / timeout → retryable
    return { kind: 'retryable' };
  } finally {
    clearTimeout(timeout);
  }
}

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------
function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function jitter(ms: number): number {
  return ms + Math.random() * ms;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// -----------------------------------------------------------------------------
// 405 for non-POST （onRequestPost が優先されるため、ここには POST 以外のみが到達）
// -----------------------------------------------------------------------------
export const onRequest: PagesFunction<Env> = async () => {
  return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Allow: 'POST',
    },
  });
};
