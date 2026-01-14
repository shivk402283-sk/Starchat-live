
export interface Player {
  id: string;
  name: string;
  age: number;
  location: string;
  countryCode: string;
  imageUrl: string;
  isOnline: boolean;
  bio: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export type View = 'HOME' | 'MESSAGES' | 'PROFILE' | 'RECHARGE' | 'CALL' | 'AGE_GATING';

export interface RechargeOption {
  amount: number;
  coins: number;
  label: string;
}

export type Language = 'en' | 'hi' | 'es' | 'ar' | 'fr' | 'pt' | 'ru' | 'ja' | 'zh' | 'de';
