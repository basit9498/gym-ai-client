export type ChatRole = 'user' | 'ai' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  message: string;
  time?: string;
}

export interface ChatThread {
  _id: string;
  title: string;
  lastMessageAt: string;
}
