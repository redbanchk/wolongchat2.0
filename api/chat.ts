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

    const resp = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: 'Ark error', details: data }), {
        status: resp.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      content: data?.choices?.[0]?.message?.content ?? ''
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'Server error', message: e?.message || String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

