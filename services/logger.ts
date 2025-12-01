export type LogLevel = 'info' | 'warn' | 'error';

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: number;
  data?: any;
}

type Listener = (logs: LogEntry[]) => void;

const logs: LogEntry[] = [];
const listeners: Listener[] = [];

const notify = () => {
  for (const l of listeners) l([...logs]);
};

export const subscribe = (listener: Listener) => {
  listeners.push(listener);
  listener([...logs]);
  return () => {
    const i = listeners.indexOf(listener);
    if (i >= 0) listeners.splice(i, 1);
  };
};

export const getLogs = () => [...logs];

export const clearLogs = () => {
  logs.length = 0;
  notify();
};

export const log = (level: LogLevel, message: string, data?: any) => {
  const id = Math.random().toString(36).slice(2);
  logs.push({ id, level, message, data, timestamp: Date.now() });
  notify();
};

