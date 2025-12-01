import { SYSTEM_INSTRUCTION, ARK_BASE_URL } from '../constants';
import { Message, Sender } from '../types';

const getEnv = (key: string) => (import.meta as any).env?.[key];

const HARD_CODED_API_KEY = 'ff74af3e-43d0-4a76-8d56-cc56d8c5b91a';
const HARD_CODED_MODEL_ID = 'ep-20251117054244-cqwzw';

export const fetchZhugeResponse = async (history: Message[], newMessage: string): Promise<string> => {
  const modelId = HARD_CODED_MODEL_ID;
  const apiKey = HARD_CODED_API_KEY;
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    { role: 'user', content: newMessage }
  ];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    // 优先使用前端密钥直连 Ark（若存在）
    if (apiKey) {
      const arkResp = await fetch(ARK_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model: modelId, messages }),
        signal: controller.signal
      });
      if (!arkResp.ok) return '调用失败，请稍后再试。';
      const arkData = await arkResp.json();
      const arkContent = arkData?.choices?.[0]?.message?.content;
      return arkContent || '亮一时思虑未及，请主公恕罪，可否再问？';
    }

    // 无前端密钥时，退回同源后端
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages, system: SYSTEM_INSTRUCTION, model: modelId }),
      signal: controller.signal
    });

    if (!resp.ok) {
      return '调用失败，请稍后再试。';
    }

    const data = await resp.json();
    const content = data?.content;
    return content || '亮一时思虑未及，请主公恕罪，可否再问？';
  } catch (e) {
    return '天机难测，亮需暂作推演，请主公稍后再问。';
  } finally {
    clearTimeout(timeout);
  }
};
