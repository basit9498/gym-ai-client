'use client';

import { useState } from 'react';
import { Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl flex-shrink-0"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <Mic size={18} className="text-white/30 flex-shrink-0 cursor-pointer hover:text-white/60 transition-colors" />
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Ask your AI trainer anything…"
        className="flex-1 bg-transparent text-white/80 py-1 text-sm outline-none placeholder-white/25" 
      />
      <button 
        onClick={handleSend} 
        disabled={!input.trim() || disabled}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 hover:scale-105"
        style={{ background: 'linear-gradient(135deg,#00d4ff,#9b59ff)' }}>
        <Send size={15} className="text-white ml-0.5" />
      </button>
    </div>
  );
}
