'use client';

import { useState } from 'react';
import { Brain, MessageCircle, Send } from 'lucide-react';

export function AIChatBox() {
  const [messages, setMessages] = useState([
      { id: 1, role: 'ai', text: "Hello! How was your session today?", time: '9:00 AM' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: input, time: 'now' };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, role: 'ai', text: "I'm analyzing your data... Looks like you're staying consistent! Keep it up. 🦾", time: 'now' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3" style={{ maxHeight: 200 }}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg,#00d4ff,#9b59ff)' }}>
                <Brain size={10} className="text-white" />
              </div>
            )}
            <div className="max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed"
              style={msg.role === 'user'
                ? { background: 'linear-gradient(135deg,#0066ff,#9b59ff)', color: 'white' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.08)' }
              }>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-xl px-3 py-2"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <MessageCircle size={13} className="text-white/30" />
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask your AI coach…" className="flex-1 bg-transparent text-white/70 text-xs outline-none placeholder-white/25" />
        <button onClick={send} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'linear-gradient(135deg,#00d4ff,#9b59ff)' }}>
          <Send size={12} className="text-white" />
        </button>
      </div>
    </div>
  );
}
