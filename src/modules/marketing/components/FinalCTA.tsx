'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(155,89,255,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)' }} />
        <div className="absolute inset-0 grid-bg opacity-30" />
        {/* Animated border top */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #9b59ff, #ff6b9d, transparent)' }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 orb-blue pointer-events-none opacity-20 float-animation" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 orb-purple pointer-events-none opacity-20 float-delayed" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}>
            <Zap size={14} fill="#00d4ff" />
            Start in 2 minutes · No credit card needed
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] mb-8">
            Transform Your
            <br />
            <span className="gradient-text glow-blue">Body With AI.</span>
          </h2>

          <p className="text-white/60 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Join 2.4 million athletes already training smarter, recovering faster, and achieving the impossible.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#pricing"
              className="btn-primary px-10 py-5 text-lg cursor-none flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <span>Start Free Trial</span>
              <ChevronRight size={20} />
            </a>
            <a
              href="#features"
              className="btn-ghost px-10 py-5 text-lg cursor-none w-full sm:w-auto text-center"
            >
              Explore Features
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">✓ 14-day free Pro trial</span>
            <span className="flex items-center gap-2">✓ 30-day money back</span>
            <span className="flex items-center gap-2">✓ Cancel anytime</span>
            <span className="flex items-center gap-2">✓ 4.9★ rating</span>
          </div>
        </motion.div>

        {/* Animated gym energy waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border"
              style={{
                borderColor: `rgba(0,212,255,${0.06 - i * 0.01})`,
                width: `${i * 200 + 300}px`,
                height: `${i * 200 + 300}px`,
                marginLeft: `${-(i * 100 + 150)}px`,
                marginTop: `${-(i * 100 + 150)}px`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
