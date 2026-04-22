'use client';

import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/chat.service';
import { ChatThread, ChatMessage } from '../types';
import { toast } from 'react-toastify';

export function useChat() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);

  const fetchThreads = useCallback(async () => {
    const res = await chatService.getThreads();
    if (res.success && res.data) {
      setThreads(res.data);
      return res.data;
    }
    if (!res.success && res.error) {
      toast.error(res.error);
    }
    return null;
  }, []);

  // Initial load: Fetch threads and select the most recent one
  useEffect(() => {
    const init = async () => {
      const data = await fetchThreads();
      if (data && data.length > 0) {
        setActiveThreadId(data[0]._id);
      }
    };
    init();
  }, [fetchThreads]);

  const fetchMessages = useCallback(async (threadId: string) => {
    if (!threadId) return;
    const res = await chatService.getMessages(threadId);
    if (res.success && res.data) {
      setMessages(res.data);
    } else if (!res.success && res.error) {
      toast.error(res.error);
    }
  }, []);



  useEffect(() => {
    if (activeThreadId) fetchMessages(activeThreadId);
    else setMessages([]);
  }, [activeThreadId, fetchMessages]);

  const createNewChat = () => {
    setActiveThreadId(null);
    setMessages([]);
  };

  const deleteThread = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await chatService.deleteThread(id);
    if (res.success) {
      setThreads(prev => prev.filter(t => t._id !== id));
      if (activeThreadId === id) createNewChat();
      toast.success("Conversation deleted.");
    } else {
      toast.error(res.error || "Failed to delete conversation.");
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;
    
    // Optimistic UI updates
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', message: text };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const res = await chatService.sendMessage(activeThreadId, text);
    
    if (!res.success) {
        setMessages(prev => [...prev.slice(0, -1)]); // Remove optimistic if failed
        toast.error(res.error || "Failed to send message.");
        setTyping(false);
        return;
    }

    const { data } = res;
    // Add AI response
    const aiMsg: ChatMessage = { 
        id: data.aiMessage._id, 
        role: data.aiMessage.role as any, 
        message: data.aiMessage.message 
    };
    setMessages(prev => [...prev, aiMsg]);

    // If this was a new thread, update thread list & active ID
    if (!activeThreadId) {
        setActiveThreadId(data.threadId);
        fetchThreads(); // Refresh titles
    }
    
    // Global Sync Dispatch if backend signaled save
    if (data.syncMetadata?.dashboardSyncRequired) {
        window.dispatchEvent(new CustomEvent('gym-arc-sync', { detail: data.syncMetadata }));
    }
    
    setTyping(false);
  };

  return {
    threads,
    activeThreadId,
    setActiveThreadId,
    messages,
    typing,
    createNewChat,
    deleteThread,
    sendMessage
  };
}
