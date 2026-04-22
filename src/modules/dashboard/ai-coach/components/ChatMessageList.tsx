'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '../types';

const QUICK_PROMPTS = [
  "What should I eat pre-workout?",
  "Adjust my plan for sore legs",
  "How many rest days do I need?",
];

interface ChatMessageListProps {
  messages: ChatMessage[];
  typing: boolean;
  onSendPrompt: (prompt: string) => void;
}

export function ChatMessageList({ messages, typing, onSendPrompt }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages, typing]);

  return (
    <>
      {/* Quick prompts - Only show if totally empty */}
      {messages.length === 0 && (
        <div className="flex gap-2 flex-wrap flex-shrink-0 mt-4 px-4 md:px-6">
          {QUICK_PROMPTS.map(q => (
            <button key={q} onClick={() => onSendPrompt(q)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white/60 hover:text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Sparkles size={11} style={{ color: '#9b59ff' }} /> {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mt-2 scroll-smooth px-4 md:px-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg,#00d4ff,#9b59ff)' }}>
                  <Brain size={14} className="text-white" />
                </div>
              )}
              <div className="max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl text-[13px] md:text-sm leading-relaxed overflow-x-auto"
                style={msg.role === 'user'
                  ? { background: 'linear-gradient(135deg,#0066ff,#9b59ff)', color: 'white', borderBottomRightRadius: 6 }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderBottomLeftRadius: 6 }
                }>
                {msg.role === 'ai' ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-lg font-bold text-white mb-2 mt-4 first:mt-0" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-base font-bold text-white mb-2 mt-3 first:mt-0" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-sm font-bold text-white mb-1 mt-2 first:mt-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="marker:text-[#00d4ff]" {...props} />,
                      code: ({node, inline, ...props}: any) => 
                        inline 
                          ? <code className="bg-black/30 px-1.5 py-0.5 rounded text-[#00d4ff] font-mono text-[12px]" {...props} />
                          : <pre className="bg-black/40 p-3 rounded-xl overflow-x-auto border border-white/10 my-2"><code className="font-mono text-[12px] text-white/90" {...props} /></pre>,
                    }}
                  >
                    {msg.message}
                  </ReactMarkdown>
                ) : (
                  msg.message
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#00d4ff,#9b59ff)' }}>
              <Brain size={14} className="text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50"
                  animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
    </>
  );
}
