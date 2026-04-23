import { ChatThread, ChatMessage } from '../types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chat`;

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('agentic_session');
    if (session) {
      try {
        const token = JSON.parse(session).token;
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {}
    }
  }
  
  return headers;
};

export const chatService = {
  async getThreads(): Promise<{ success: boolean; data?: ChatThread[]; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/threads`, { headers: getHeaders() });
      const data = await res.json();
      if (res.ok) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async getMessages(threadId: string): Promise<{ success: boolean; data?: ChatMessage[]; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/messages/${threadId}`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map((m: any) => ({
          id: m._id, role: m.role, message: m.message, time: 'now' 
        }));
        return { success: true, data: mapped };
      }
      return { success: false, error: 'Failed to fetch messages' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async sendMessage(threadId: string | null, message: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/message`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ threadId, message })
      });
      const data = await res.json();
      if (res.ok) return { success: true, data };
      return { success: false, error: data.message || 'Error sending message' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async deleteThread(threadId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${API_URL}/thread/${threadId}`, { 
        method: 'DELETE', 
        headers: getHeaders() 
      });
      if (res.ok) return { success: true };
      return { success: false, error: 'Failed to delete thread' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
};
