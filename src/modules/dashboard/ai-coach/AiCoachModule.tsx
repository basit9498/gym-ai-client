'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import DashboardTopbar from '../components/Topbar';
import { useChat } from './hooks/useChat';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatMessageList } from './components/ChatMessageList';
import { ChatInput } from './components/ChatInput';

export function AiCoachModule() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    messages,
    typing,
    createNewChat,
    deleteThread,
    sendMessage
  } = useChat();

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ maxHeight: '100vh' }}>
      <DashboardTopbar title="AI Coach Chat" />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Toggle Sidebar (Mobile) */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden absolute top-4 left-4 z-20 text-white/50 bg-black/40 p-2 rounded-xl backdrop-blur">
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <ChatSidebar 
          threads={threads}
          activeThreadId={activeThreadId}
          sidebarOpen={sidebarOpen}
          onCreateNewChat={createNewChat}
          onSelectThread={setActiveThreadId}
          onDeleteThread={deleteThread}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden gap-4">
          {/* Header Status */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-2xl flex-shrink-0 md:ml-0 ml-10"
            style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#00d4ff,#9b59ff)' }}>
                  <Brain size={20} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#03030f]"
                  style={{ background: '#00ff80' }} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">AI Coach</p>
                <p className="text-xs" style={{ color: '#00d4ff' }}>● Engine Active. Ready to assist.</p>
              </div>
            </div>
          </motion.div>

          <ChatMessageList 
            messages={messages}
            typing={typing}
            onSendPrompt={sendMessage}
          />

          <ChatInput 
            onSendMessage={sendMessage}
            disabled={typing}
          />
        </div>
      </div>
    </div>
  );
}
