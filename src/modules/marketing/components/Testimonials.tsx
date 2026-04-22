'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Marcus Rodriguez',
    role: 'Amateur Powerlifter',
    avatar: '🏋️',
    stars: 5,
    text: "I've had 4 personal trainers over 8 years. This AI knows more about my body than any of them. My squat went from 120kg to 185kg in 5 months. Insane.",
    stats: '+65kg squat in 5 months',
    color: '#00d4ff',
  },
  {
    name: 'Sarah Kim',
    role: 'Busy Mom & Entrepreneur',
    avatar: '🌟',
    stars: 5,
    text: "I have 45 minutes, 4x a week. This AI builds around my schedule, my energy levels, even my sleep data. I lost 18kg in 4 months while building actual muscle. Life-changing.",
    stats: '-18kg in 4 months',
    color: '#9b59ff',
  },
  {
    name: 'James Mitchell',
    role: 'Marathon Runner',
    avatar: '🏃',
    stars: 5,
    text: "The recovery intelligence feature alone is worth 10x the price. I haven't had a running injury in 8 months. My 5K PR dropped from 28 min to 21 min. Unbelievable.",
    stats: '5K: 28 → 21 minutes',
    color: '#ff6b9d',
  },
  {
    name: 'Alex Chen',
    role: 'Software Engineer',
    avatar: '💻',
    stars: 5,
    text: "As a developer, I appreciate the data. Every session gives me detailed analytics I never had before. The posture correction caught my anterior pelvic tilt in week 1.",
    stats: 'Zero injuries in 6 months',
    color: '#00ff80',
  },
  {
    name: 'Priya Sharma',
    role: 'Competitive Bodybuilder',
    avatar: '💪',
    stars: 5,
    text: "The meal scanner is next level. I point my camera at food and get macros instantly. The AI nutrition plan got me competition-ready 3 weeks ahead of schedule.",
    stats: 'Competition-ready in 12 weeks',
    color: '#ffb800',
  },
  {
    name: 'Tom Gallagher',
    role: 'CrossFit Enthusiast',
    avatar: '⚡',
    stars: 5,
    text: "The voice trainer during WODs is incredible. Real-time form correction while I'm in the middle of a clean and jerk? Nothing else on the market does this.",
    stats: '+40% WOD performance',
    color: '#00d4ff',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsPerPage = 3;
  const maxIndex = Math.ceil(TESTIMONIALS.length / itemsPerPage) - 1;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex(i => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const visibleTestimonials = TESTIMONIALS.slice(
    index * itemsPerPage,
    index * itemsPerPage + itemsPerPage
  );

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <div className="absolute left-0 top-1/2 w-[500px] h-[500px] orb-blue pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(255,184,0,0.08)', border: '1px solid rgba(255,184,0,0.2)', color: '#ffb800' }}>
            <Star size={14} fill="#ffb800" />
            4.9/5 from 120,000+ Reviews
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Athletes Who
            <br />
            <span className="gradient-text">Changed Everything.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          className="grid md:grid-cols-3 gap-6 mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleTestimonials.map((t, i) => (
            <motion.div
              key={`${index}-${i}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="feature-card glass-card p-6 flex flex-col justify-between"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Stars */}
              <div>
                <div className="flex gap-1 mb-4">
                  {Array(t.stars).fill(0).map((_, si) => (
                    <Star key={si} size={14} fill="#ffb800" className="text-[#ffb800]" />
                  ))}
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>

                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium mb-5"
                  style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}>
                  ✓ {t.stats}
                </div>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.color}20` }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <ChevronLeft size={18} className="text-white/70" />
          </button>
          <div className="flex gap-2">
            {Array(maxIndex + 1).fill(0).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 24 : 8,
                  background: i === index ? '#00d4ff' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <ChevronRight size={18} className="text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
}
