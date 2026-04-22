'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Cpu, MessageSquare } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Profile & Goal Setting',
    description: 'Tell us about your body, your equipment, and your targets. Our AI analyzes your starting point to build a custom baseline fitness profile.',
    color: '#00d4ff',
    features: ['Profile Creation', 'Body Goal Mapping', 'Equipment Inventory', 'Baseline Analytics'],
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Designs Your Plans',
    description: 'Our agentic engine calculates your perfect weekly workout and nutrition split. Every session and macro target is tailored for your unique evolution.',
    color: '#9b59ff',
    features: ['Custom Workout Splits', 'Macro & Calorie Targets', 'Recovery Smart-Periods', 'Dynamic Plan Updates'],
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Track, Chat & Conquer',
    description: 'Execute your sessions, log your meals, and chat with your 24/7 AI Coach for real-time support. All your metrics are tracked and adapted daily.',
    color: '#ff6b9d',
    features: ['Interactive Session Logs', 'AI Coach Chat Support', 'Precision Meal Tracking', 'Progress Visualizer'],
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden" ref={containerRef}>
      <div className="absolute left-1/4 top-1/2 w-[600px] h-[600px] orb-blue pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
            <Cpu size={14} />
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            From Zero to Elite.
            <br />
            <span className="gradient-text">In Three Steps.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            We've eliminated every friction point. Your transformation starts in minutes, not months.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="w-full origin-top"
              style={{ height: lineHeight, background: 'linear-gradient(to bottom, #00d4ff, #9b59ff, #ff6b9d)' }}
            />
          </div>

          <div className="space-y-20">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid lg:grid-cols-2 gap-10 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
                >
                  {/* Content */}
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-6xl font-black opacity-10">{step.number}</span>
                      <div className="h-px flex-1 opacity-20"
                        style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: `${step.color}20`, border: `1px solid ${step.color}30` }}>
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-white">{step.title}</h3>
                    <p className="text-white/50 text-base leading-relaxed mb-6">{step.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.features.map(feat => (
                        <div key={feat} className="flex items-center gap-2 text-sm text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: step.color }} />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual card */}
                  <div className={!isEven ? 'lg:col-start-1' : ''}>
                    <div className="gradient-border">
                      <div className="glass-card p-8 relative overflow-hidden"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="absolute inset-0 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at 30% 30%, ${step.color}15 0%, transparent 60%)` }} />

                        {/* Step visual */}
                        <div className="flex items-center justify-center" style={{ height: 180 }}>
                          <div className="relative">
                            {/* Pulse rings */}
                            {[1, 2, 3].map((ring) => (
                              <div
                                key={ring}
                                className="absolute rounded-full border pulse-ring"
                                style={{
                                  width: `${ring * 60}px`,
                                  height: `${ring * 60}px`,
                                  borderColor: `${step.color}30`,
                                  top: `${-ring * 30 + 30}px`,
                                  left: `${-ring * 30 + 30}px`,
                                  animationDelay: `${ring * 0.5}s`,
                                }}
                              />
                            ))}
                            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center z-10"
                              style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}80)`, boxShadow: `0 0 40px ${step.color}40` }}>
                              <Icon size={30} className="text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Step number badge */}
                        <div className="absolute top-4 right-4 text-xs font-black px-3 py-1.5 rounded-full"
                          style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
                          Step {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Center dot on timeline */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                      <div className="w-4 h-4 rounded-full border-2 z-10"
                        style={{ background: step.color, borderColor: '#03030f', boxShadow: `0 0 20px ${step.color}` }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
