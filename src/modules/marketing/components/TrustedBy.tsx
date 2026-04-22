'use client';

import { motion } from 'framer-motion';

const BRANDS = [
  { name: 'FitLife Pro', emoji: '🏋️' },
  { name: 'GoldGym Elite', emoji: '⚡' },
  { name: 'NutriAI', emoji: '🥗' },
  { name: 'CoreFit Labs', emoji: '💪' },
  { name: 'AthleteIQ', emoji: '🧠' },
  { name: 'MaxPerform', emoji: '🚀' },
  { name: 'BodyOS', emoji: '🔬' },
  { name: 'VelocityGym', emoji: '⚡' },
];

const TICKER_ITEMS = [
  '🔥 Sarah lost 12kg in 90 days',
  '💪 Marcus benched 140kg PR',
  '⚡ 500 new users joined today',
  '🏆 #1 AI Fitness App 2025',
  '🥗 95% nutrition plan adherence',
  '🎯 2.4M workouts completed',
  '🚀 Jake\'s squat form improved 40%',
  '✨ Rated 4.9/5 by 120K users',
];

export default function TrustedBy() {
  const duplicated = [...BRANDS, ...BRANDS];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Live ticker */}
      <div className="mb-12 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,212,255,0.03)', padding: '12px 0' }}>
        <div className="ticker-track whitespace-nowrap inline-flex gap-8">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm text-white/50 px-4">
              {item}
              <span className="text-white/20">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-white/40 uppercase tracking-widest mb-10 font-medium"
        >
          Trusted by 2,400+ gyms, trainers & athletes worldwide
        </motion.p>

        {/* Brand logos scroll */}
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #03030f, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #03030f, transparent)' }} />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 w-max"
          >
            {duplicated.map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl whitespace-nowrap flex-shrink-0 transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span className="text-2xl">{brand.emoji}</span>
                <span className="text-white/60 font-semibold text-sm group-hover:text-white/90 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { num: '2.4M+', label: 'Active Athletes', color: '#00d4ff' },
            { num: '50M+', label: 'Workouts Analyzed', color: '#9b59ff' },
            { num: '99.8%', label: 'Uptime SLA', color: '#00ff80' },
            { num: '180+', label: 'Countries', color: '#ff6b9d' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center p-5 glass-card"
            >
              <p className="text-3xl font-black mb-1" style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}60` }}>
                {stat.num}
              </p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
