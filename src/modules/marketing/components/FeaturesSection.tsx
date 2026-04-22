'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Wallet, Brain, TrendingUp, Dumbbell, Utensils, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Dumbbell,
    title: 'Smart Training Architect',
    description: 'Generate personalized weekly workout plans dynamically based on your physical goals, equipment, and real-time feedback.',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.2)',
    tag: 'Training',
  },
  {
    icon: Brain,
    title: 'Intelligent AI Coach',
    description: '24/7 access to your personal fitness instructor. Get answers, motivation, and plan adjustments via interactive chat threads.',
    color: '#9b59ff',
    glow: 'rgba(155,89,255,0.2)',
    tag: 'Coaching',
  },
  {
    icon: Utensils,
    title: 'Precision Meal Tracking',
    description: 'Log your nutrition with pinpoint accuracy. Track calories, macros, and hydration to hit your body composition targets.',
    color: '#ff6b9d',
    glow: 'rgba(255,107,157,0.2)',
    tag: 'Nutrition',
  },
  {
    icon: Wallet,
    title: 'Integrated Fitness Wallet',
    description: 'Your digital identity and transaction hub. Securely manage your fitness credits and track your economic growth history.',
    color: '#ffb800',
    glow: 'rgba(255,184,0,0.2)',
    tag: 'Web3',
  },
  {
    icon: TrendingUp,
    title: 'Advanced Analytics',
    description: 'Deep-dive into your growth with visual trends. Track strength, weight, and performance metrics over intelligent timelines.',
    color: '#00ff80',
    glow: 'rgba(0,255,128,0.2)',
    tag: 'Insights',
  },
  {
    icon: LayoutDashboard,
    title: 'Unified Command Center',
    description: 'A high-performance overview of your entire fitness ecosystem. Real-time stats and active sessions at your fingertips.',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.2)',
    tag: 'Overview',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orb-purple pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(155,89,255,0.1)', border: '1px solid rgba(155,89,255,0.2)', color: '#9b59ff' }}>
            <Shield size={14} />
            Power Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Everything Your Training
            <br />
            <span className="gradient-text">Was Missing.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Six AI-powered systems working in harmony to make you unstoppable. No fluff, no filler — just results.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="feature-card glass-card p-7 group relative overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${feat.glow} 0%, transparent 60%)` }} />

                {/* Tag */}
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mb-5"
                  style={{ background: `${feat.glow}`, color: feat.color, border: `1px solid ${feat.color}30` }}>
                  {feat.tag}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative"
                  style={{ background: `${feat.glow}`, border: `1px solid ${feat.color}30` }}>
                  <Icon size={22} style={{ color: feat.color }} />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `0 0 20px ${feat.glow}` }} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {feat.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                  {feat.description}
                </p>

                {/* Arrow on hover */}
                <div className="flex items-center gap-1 mt-5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ color: feat.color }}>
                  Learn more →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
