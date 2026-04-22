'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Dumbbell, BarChart2 } from 'lucide-react';

const CHAT_MESSAGES = [
  { role: 'user', text: "My left knee hurts during squats. What should I do?", delay: 0 },
  { role: 'ai', text: "I'm analyzing your last 3 squat sessions... Your left knee caves in during the descent. Try widening your stance 2cm and focusing on driving knees outward. I'll also add mobility work to today's plan. 🎯", delay: 2000 },
  { role: 'user', text: "How about my nutrition today?", delay: 5000 },
  { role: 'ai', text: "You're 400 calories short of your 3,200 goal. With leg day incoming, I'd recommend: 200g chicken + sweet potato post-workout. This will optimize glycogen and muscle protein synthesis. 🥗", delay: 7500 },
  { role: 'user', text: "Generate me a 5-day plan for hypertrophy", delay: 11000 },
  { role: 'ai', text: "Generating your personalized hypertrophy program... ✅ Day 1: Chest/Tris ✅ Day 2: Back/Bis ✅ Day 3: Rest+Mobility ✅ Day 4: Legs ✅ Day 5: Shoulders. Saved to your dashboard!", delay: 13500 },
];

function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState<typeof CHAT_MESSAGES>([]);
  const [typing, setTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= CHAT_MESSAGES.length) {
      setTimeout(() => {
        setVisibleMessages([]);
        setCurrentIndex(0);
      }, 4000);
      return;
    }

    const msg = CHAT_MESSAGES[currentIndex];
    const delay = currentIndex === 0 ? 800 : 2500;

    const timer = setTimeout(() => {
      if (msg.role === 'ai') {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setVisibleMessages(prev => [...prev, msg]);
          setCurrentIndex(i => i + 1);
        }, 1500);
      } else {
        setVisibleMessages(prev => [...prev, msg]);
        setCurrentIndex(i => i + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative mx-auto" style={{ width: 300 }}>
      {/* Phone frame */}
      <div className="relative rounded-[40px] overflow-hidden"
        style={{
          background: '#0a0a1a',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 80px rgba(0,212,255,0.15), 0 40px 80px rgba(0,0,0,0.5)',
          height: 580,
        }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 rounded-b-2xl z-10"
          style={{ background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.08)' }} />

        {/* Screen */}
        <div className="flex flex-col h-full pt-8">
          {/* App header */}
          <div className="px-4 py-3 flex items-center gap-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
              <Brain size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold">AI Coach</p>
              <p className="text-xs" style={{ color: '#00d4ff' }}>● Online</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Dumbbell size={14} className="text-white/30" />
              <BarChart2 size={14} className="text-white/30" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden px-3 py-4 flex flex-col gap-3">
            <AnimatePresence>
              {visibleMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
                      <Brain size={10} className="text-white" />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed"
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg, #0066ff, #9b59ff)', color: 'white', borderBottomRightRadius: 4 }
                      : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderBottomLeftRadius: 4 }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
                  <Brain size={10} className="text-white" />
                </div>
                <div className="px-3 py-2.5 rounded-2xl flex items-center gap-1"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/60"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input bar */}
          <div className="px-3 pb-6">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-white/30 text-xs flex-1">Ask your AI trainer...</p>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
                <Send size={12} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow under phone */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.2) 0%, transparent 70%)', filter: 'blur(20px)' }} />
    </div>
  );
}

export default function InteractiveDemo() {
  return (
    <section id="demo" className="relative py-28 overflow-hidden">
      <div className="absolute right-0 top-1/2 w-[500px] h-[500px] orb-blue pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <PhoneMockup />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
              <Brain size={14} />
              Live Demo
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Talk To Your AI Trainer
              <br />
              <span className="gradient-text">Like A Human.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Not a chatbot. Not a script. A genuinely intelligent AI that understands your body, your goals, and your limitations — and actually helps.
            </p>

            <div className="space-y-4">
              {[
                { emoji: '🧠', title: 'Context-aware responses', desc: 'Remembers every session, every injury, every goal' },
                { emoji: '⚡', title: 'Instant answers', desc: 'No loading, no waiting — real-time AI inference' },
                { emoji: '🎯', title: 'Actionable guidance', desc: 'Not generic tips — specific to you, right now' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{item.title}</p>
                    <p className="text-white/50 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
