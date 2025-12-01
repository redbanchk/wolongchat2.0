import { SYSTEM_INSTRUCTION } from '../constants';
import { Message, Sender } from '../types';

const getEnv = (key: string) => (import.meta as any).env?.[key];

export const fetchZhugeResponse = async (history: Message[], newMessage: string): Promise<string> => {
  const modelId = getEnv('VITE_ARK_MODEL_ID') || 'ep-20251117054244-cqwzw';
  const apiKey = getEnv('VITE_ARK_API_KEY');
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  const messages = [
    ...history.map(m => ({ role: m.sender === Sender.User ? 'user' : 'assistant', content: m.text })),
    { role: 'user', content: newMessage }
  ];

  try {
    // In local dev, allow direct call with local env to ease testing
    if (isLocal && apiKey) {
      const resp = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model: modelId, messages: [{ role: 'system', content: SYSTEM_INSTRUCTION }, ...messages] })
      });
      if (!resp.ok) return '调用失败，请稍后再试。';
      const data = await resp.json();
      const content = data?.choices?.[0]?.message?.content;
      return content || '亮一时思虑未及，请主公恕罪，可否再问？';
    }

    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages, system: SYSTEM_INSTRUCTION, model: modelId })
    });

    if (!resp.ok) {
      return '调用失败，请稍后再试。';
    }

    const data = await resp.json();
    const content = data?.content;
    return content || '亮一时思虑未及，请主公恕罪，可否再问？';
  } catch (e) {
    return '天机难测，亮需暂作推演，请主公稍后再问。';
  }
};
