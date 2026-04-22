'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const PROGRESS_BARS = [
  { label: 'Strength Gained', value: 78, color: '#00d4ff' },
  { label: 'Fat Lost', value: 65, color: '#9b59ff' },
  { label: 'Endurance Improved', value: 91, color: '#ff6b9d' },
  { label: 'Recovery Optimized', value: 84, color: '#00ff80' },
];

const TRANSFORMATIONS = [
  { name: 'Marcus R.', time: '90 days', before: 'Fat 24%', after: 'Fat 14%', lbs: '-22lbs', emoji: '🏋️' },
  { name: 'Sarah K.', time: '60 days', before: 'Bench 40kg', after: 'Bench 72kg', lbs: '+32kg', emoji: '💪' },
  { name: 'James L.', time: '120 days', before: '5km: 32min', after: '5km: 22min', lbs: '-10min', emoji: '🏃' },
];

function AnimatedProgressBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 10px ${color}60` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function ProgressSection() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] orb-purple pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(0,255,128,0.08)', border: '1px solid rgba(0,255,128,0.2)', color: '#00ff80' }}>
            <TrendingUp size={14} />
            Real Results
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Numbers Don't Lie.
            <br />
            <span className="gradient-text">Results Do.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Progress bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white mb-8">Average User Improvement at 90 Days</h3>
            {PROGRESS_BARS.map((bar, i) => (
              <AnimatedProgressBar key={bar.label} {...bar} delay={i * 0.15} />
            ))}

            {/* Big stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="glass-card p-6 mt-8"
              style={{ border: '1px solid rgba(0,212,255,0.2)', background: 'rgba(0,212,255,0.05)' }}
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-5xl font-black gradient-text">94%</p>
                  <p className="text-white/60 text-sm mt-1">of users hit their primary goal within 90 days</p>
                </div>
                <div className="ml-auto text-4xl">🏆</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Transformation cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Real Transformations</h3>
            <div className="space-y-4">
              {TRANSFORMATIONS.map((t, i) => (
                <motion.div
                  key={t.name}
                  className="glass-card p-5 cursor-pointer transition-all duration-300"
                  style={{
                    border: activeCard === i ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    background: activeCard === i ? 'rgba(0,212,255,0.05)' : 'rgba(255,255,255,0.03)',
                  }}
                  onClick={() => setActiveCard(i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.06)' }}>
                      {t.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white font-bold">{t.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>
                          {t.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/40 line-through">{t.before}</span>
                        <span className="text-xs text-white/30">→</span>
                        <span className="text-xs text-white/80">{t.after}</span>
                        <span className="text-xs font-bold ml-auto" style={{ color: '#00ff80' }}>{t.lbs}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Counter */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { val: '2.4M', label: 'Users' },
                { val: '50M+', label: 'Workouts' },
                { val: '4.9★', label: 'Rating' },
              ].map((c) => (
                <div key={c.label} className="text-center p-4 glass-card"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-2xl font-black gradient-text">{c.val}</p>
                  <p className="text-xs text-white/50 mt-0.5">{c.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
