export enum Sender {
  User = 'USER',
  Zhuge = 'ZHUGE'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
}

export interface PresetQuestion {
  id: string;
  label: string; // The text shown on the bubble (e.g., "修身养性")
  query: string; // The actual text sent to API (e.g., "先生认为，如何修身养性？")
}