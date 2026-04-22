'use client';

import { motion } from 'framer-motion';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { ChatThread } from '../types';

interface ChatSidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  sidebarOpen: boolean;
  onCreateNewChat: () => void;
  onSelectThread: (id: string) => void;
  onDeleteThread: (id: string, e: React.MouseEvent) => void;
}

export function ChatSidebar({
  threads,
  activeThreadId,
  sidebarOpen,
  onCreateNewChat,
  onSelectThread,
  onDeleteThread
}: ChatSidebarProps) {
  return (
    <motion.div
      animate={{ x: sidebarOpen ? 0 : -300, width: sidebarOpen ? 260 : 0, opacity: sidebarOpen ? 1 : 0 }}
      className={`flex flex-col border-r flex-shrink-0 z-10 ${!sidebarOpen ? 'pointer-events-none' : ''}`}
      style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
    >
      <div className="p-4">
        <button onClick={onCreateNewChat} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
          style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(155,89,255,0.1))', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
          <Plus size={16} /> New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
        <p className="text-[10px] uppercase font-bold text-white/30 tracking-wider mb-2 px-1">Recent Conversations</p>
        {threads.length === 0 && <p className="text-xs text-white/40 px-1 italic">No history found.</p>}
        
        {threads.map(t => (
          <div key={t._id} onClick={() => onSelectThread(t._id)}
            className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors text-sm ${activeThreadId === t._id ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}>
            <div className="flex items-center gap-2 truncate">
              <MessageSquare size={14} className="flex-shrink-0 opacity-50" />
              <span className="truncate">{t.title}</span>
            </div>
            <button onClick={(e) => onDeleteThread(t._id, e)} className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
