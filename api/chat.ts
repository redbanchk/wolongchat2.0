export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const apiKey = process.env.ARK_API_KEY;
  const defaultModel = process.env.ARK_MODEL_ID || 'ep-20251117054244-cqwzw';
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing ARK_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const { messages, system, model } = body || {};
    const modelId = model || defaultModel;

    const payload = {
      model: modelId,
      messages: [
        system ? { role: 'system', content: system } : null,
        ...(Array.isArray(messages) ? messages : [])
      ].filter(Boolean)
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    const resp = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);

    let data: any = null;
    try {
      data = await resp.json();
    } catch {
      // attempt to read as text when body is not JSON
      const text = await resp.text();
      data = { raw: text };
    }
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: 'Ark error', status: resp.status, details: data }), {
        status: resp.status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    return new Response(JSON.stringify({
      content: data?.choices?.[0]?.message?.content ?? ''
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (e: any) {
    const errMsg = e?.message || String(e);
    return new Response(JSON.stringify({ error: 'Server error', message: errMsg, name: e?.name, stack: undefined }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
}
