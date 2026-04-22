'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Do I need a wallet to get started?',
    a: 'Not at all. You can explore the platform and start your AI coaching sessions immediately. We will help you create a secure, developer-controlled wallet only when you are ready to settle your usage or unlock advanced features.',
  },
  {
    q: 'How exactly am I charged?',
    a: 'We use a strictly usage-based model: $0.001 per API request and $0.01 for every 1,000 AI output tokens generated. Your usage is tracked in real-time, and you only pay for what you actually consume via USDC.',
  },
  {
    q: 'What is token usage?',
    a: 'Tokens are the building blocks of AI communication. 1,000 tokens represent approximately 750 words of high-quality, personalized coaching or nutrition advice. This allows for extremely granular and fair pricing.',
  },
  {
    q: 'Can I pay with USDC directly?',
    a: 'Absolutely. Our platform is built on Circle infrastructure, allowing you to settle your usage balance with USDC across the Arc, Polygon, and Ethereum networks with near-instant finality.',
  },
  {
    q: 'Are there any monthly subscription fees?',
    a: "No. There are zero setup fees, no monthly base costs, and no hidden charges. If you don't use the platform for a week, you don't pay a cent. It's the most transparent way to power your fitness journey.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${open ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.07)'}`, background: open ? 'rgba(0,212,255,0.03)' : 'rgba(255,255,255,0.02)', transition: 'all 0.3s ease' }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-none"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-semibold text-white/90 text-base">{q}</span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{ background: open ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)' }}
        >
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus size={16} style={{ color: open ? '#00d4ff' : 'rgba(255,255,255,0.5)' }} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="accordion-content"
          >
            <div className="px-6 pb-5">
              <p className="text-white/60 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
            <HelpCircle size={14} />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Got Questions?
            <br />
            <span className="gradient-text">We've Got Answers.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/60 text-sm mb-3">Still have questions?</p>
          <a href="mailto:hello@agenticai.gym" className="text-sm font-semibold"
            style={{ color: '#00d4ff' }}>
            Contact our team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
