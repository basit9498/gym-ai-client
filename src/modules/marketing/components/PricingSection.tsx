'use client';

import { motion } from 'framer-motion';
import { Check, ShieldCheck, Sparkles, Terminal, Wallet, BadgeCheck, Coins } from 'lucide-react';

const USAGE_PLANS = [
  {
    name: 'API Usage',
    icon: Terminal,
    price: '0.001',
    unit: 'per request',
    description: 'High-performance APIs for custom fitness integrations.',
    color: '#00d4ff',
    features: [
      'Fast response times',
      'Secure JSON infrastructure',
      'Scalable usage limits',
      'Developer-first docs',
    ],
    cta: 'Start Free',
  },
  {
    name: 'AI Token Usage',
    icon: Sparkles,
    price: '0.01',
    unit: 'per 1k tokens',
    description: 'The brain of your workout. Advanced AI coaching models.',
    color: '#9b59ff',
    features: [
      'Personalized coaching',
      'Smart workout plans',
      'Nutrition guidance',
      'Adaptive feedback',
    ],
    cta: 'Try AI Coach',
    isPopular: true,
  },
  {
    name: 'Wallet Payments',
    icon: Wallet,
    price: 'USDC',
    unit: 'settlement',
    description: 'Frictionless blockchain payments powered by Circle.',
    color: '#00ff80',
    features: [
      'Institutional security',
      'Fast USDC settlement',
      'Multi-chain ready',
      'No setup fees',
    ],
    cta: 'Connect Wallet',
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Powered by Circle' },
  { icon: Sparkles, label: 'AI Smart Coaching' },
  { icon: BadgeCheck, label: 'Pay Only What You Use' },
  { icon: Coins, label: 'Secure Payments' },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-28 overflow-hidden bg-[#03030f]">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(0,255,128,0.05)', border: '1px solid rgba(0,255,128,0.1)', color: '#00ff80' }}>
            <Zap size={14} className="fill-[#00ff80]" />
            Pay As You Go
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white text-center">
            Only Pay For
            <br />
            <span className="gradient-text-blue">What You Use.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            No monthly subscriptions. No hidden fees. Start for free and only pay based on your actual API and AI usage via USDC.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <badge.icon size={14} className="text-[#00d4ff]" />
                <span className="text-xs font-semibold text-white/70">{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {USAGE_PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const isSettlement = plan.price === 'USDC';

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`pricing-card relative ${plan.isPopular ? 'scale-105 z-10' : ''}`}
              >
                <div
                  className="glass-card p-8 h-full flex flex-col transition-all duration-500 hover:border-white/20"
                  style={{
                    border: plan.isPopular ? `2px solid ${plan.color}` : '1px solid rgba(255,255,255,0.1)',
                    background: plan.isPopular ? `${plan.color}05` : 'rgba(255,255,255,0.02)',
                    boxShadow: plan.isPopular ? `0 0 60px ${plan.color}10` : 'none',
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white"
                      style={plan.isPopular ? { borderColor: `${plan.color}40`, color: plan.color } : {}}>
                      <Icon size={18} />
                    </div>
                    <span className="text-lg font-bold text-white">{plan.name}</span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-end gap-1">
                      {!isSettlement && <span className="text-white/40 text-2xl font-medium">$</span>}
                      <span className={`${isSettlement ? 'text-4xl' : 'text-6xl'} font-black text-white leading-none`}>
                        {plan.price}
                      </span>
                      <span className="text-white/40 text-sm mb-2">{plan.unit}</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm mb-8 leading-relaxed">{plan.description}</p>

                  <div className="flex-1 space-y-4 mb-8">
                    {plan.features.map(feat => (
                      <div key={feat} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 mt-0.5">
                          <Check size={11} className="text-white" />
                        </div>
                        <span className="text-white/70">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300
                      ${plan.isPopular ? 'bg-white text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}
                    `}
                  >
                    <span>{plan.cta} →</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-white/40 mt-12 bg-white/5 py-4 rounded-2xl border border-white/5 mx-auto max-w-2xl px-6"
        >
          Institutional grade security via Circle · Start without a wallet · Create developer-controlled wallets on demand
        </motion.p>
      </div>
    </section>
  );
}

import { Zap } from 'lucide-react';
