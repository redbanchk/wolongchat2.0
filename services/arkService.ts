import { SYSTEM_INSTRUCTION, ARK_BASE_URL } from '../constants';
import { Message, Sender } from '../types';
import { log } from './logger';

const getEnv = (key: string) => (import.meta as any).env?.[key];

export const fetchZhugeResponse = async (history: Message[], newMessage: string): Promise<string> => {
  const viteApiKey = getEnv('VITE_ARK_API_KEY');
  const viteModelId = getEnv('VITE_ARK_MODEL_ID');
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    { role: 'user', content: newMessage }
  ];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    log('info', '请求开始', { mode: isLocal && viteApiKey ? 'local-direct' : 'server-proxy' });

    // 仅在本地开发且显式提供 VITE_ARK_API_KEY 时，允许直连 Ark 便于调试
    if (isLocal && viteApiKey) {
      const arkResp = await fetch(ARK_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${viteApiKey}`
        },
        body: JSON.stringify({ model: viteModelId, messages }),
        signal: controller.signal
      });
      if (!arkResp.ok) {
        let details: any = undefined;
        try { details = await arkResp.json(); } catch {}
        log('error', '本地直连失败', { status: arkResp.status, details });
        return '调用失败，请稍后再试。';
      }
      const arkData = await arkResp.json();
      const arkContent = arkData?.choices?.[0]?.message?.content;
      log('info', '本地直连成功');
      return arkContent || '亮一时思虑未及，请主公恕罪，可否再问？';
    }

    // 无前端密钥时，退回同源后端
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages, system: SYSTEM_INSTRUCTION }),
      signal: controller.signal
    });

    if (!resp.ok) {
      let details: any = undefined;
      try { details = await resp.json(); } catch {}
      log('error', '服务端代理失败', { status: resp.status, details });
      return '调用失败，请稍后再试。';
    }

    const data = await resp.json();
    const content = data?.content;
    log('info', '服务端代理成功');
    return content || '亮一时思虑未及，请主公恕罪，可否再问？';
  } catch (e) {
    log('error', '请求异常', { error: String(e) });
    return '天机难测，亮需暂作推演，请主公稍后再问。';
  } finally {
    clearTimeout(timeout);
  }
};
