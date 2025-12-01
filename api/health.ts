export const config = { runtime: 'edge' };

export default async function handler(): Promise<Response> {
  const hasKey = !!process.env.ARK_API_KEY;
  const model = process.env.ARK_MODEL_ID || 'ep-20251117054244-cqwzw';
  return new Response(JSON.stringify({ ok: true, hasKey, model }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

