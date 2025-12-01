import { SYSTEM_INSTRUCTION } from '../constants';
import { Message, Sender } from '../types';

const BASE_URL = 'https://ark.cn-beijing.volces.com/api/v3';

const getEnv = (key: string) => (import.meta as any).env?.[key];

export const fetchZhugeResponse = async (history: Message[], newMessage: string): Promise<string> => {
  const apiKey = getEnv('VITE_ARK_API_KEY');
  const modelId = getEnv('VITE_ARK_MODEL_ID') || 'ep-20251117054244-cqwzw';

  if (!apiKey) {
    return '未检测到密钥，请在本地 .env.local 设置 VITE_ARK_API_KEY。';
  }

  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    ...history.map(m => ({ role: m.sender === Sender.User ? 'user' : 'assistant', content: m.text })),
    { role: 'user', content: newMessage }
  ];

  try {
    const resp = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ model: modelId, messages })
    });

    if (!resp.ok) {
      return '调用失败，请稍后再试。';
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    return content || '亮一时思虑未及，请主公恕罪，可否再问？';
  } catch (e) {
    return '天机难测，亮需暂作推演，请主公稍后再问。';
  }
};

