'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Activity, Brain, ChevronRight, Play } from 'lucide-react';

const STATS = [
  { value: '98%', label: 'Success Rate' },
  { value: '2.4M', label: 'Active Users' },
  { value: '50M+', label: 'Workouts Done' },
  { value: '4.9★', label: 'App Rating' },
];

// Animated 3D dashboard mockup
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow behind */}
      <div className="absolute inset-0 rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, rgba(155,89,255,0.1) 50%, transparent 70%)', filter: 'blur(40px)', transform: 'scale(1.2)' }} />

      {/* Main card */}
      <motion.div
        initial={{ rotateY: -15, rotateX: 10, opacity: 0, scale: 0.9 }}
        animate={{ rotateY: 0, rotateX: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
        className="relative glass-card p-6 border border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-white/50 mb-1">AI Coach Dashboard</p>
            <p className="text-white font-semibold">Today's Session</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" style={{ boxShadow: '0 0 6px #00d4ff', animation: 'pulse 2s infinite' }} />
            Live AI Active
          </div>
        </div>

        {/* AI Avatar + pose */}
        <div className="relative mb-5 rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.15), rgba(155,89,255,0.15))', border: '1px solid rgba(255,255,255,0.06)', height: 160 }}>
          {/* Skeleton overlay */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160" fill="none">
            {/* Body skeleton */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {/* Head */}
              <motion.circle cx="150" cy="30" r="14" stroke="#00d4ff" strokeWidth="1.5"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }} />
              {/* Spine */}
              <motion.line x1="150" y1="44" x2="150" y2="95" stroke="#00d4ff" strokeWidth="1.5"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
              {/* Shoulders */}
              <motion.line x1="110" y1="60" x2="190" y2="60" stroke="#9b59ff" strokeWidth="1.5"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
              {/* Left arm */}
              <motion.polyline points="110,60 85,90 80,120" stroke="#9b59ff" strokeWidth="1.5" fill="none"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
              {/* Right arm */}
              <motion.polyline points="190,60 215,90 220,120" stroke="#9b59ff" strokeWidth="1.5" fill="none"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} />
              {/* Hips */}
              <motion.line x1="125" y1="95" x2="175" y2="95" stroke="#00d4ff" strokeWidth="1.5"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
              {/* Legs */}
              <motion.polyline points="130,95 120,130 115,155" stroke="#00d4ff" strokeWidth="1.5" fill="none"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
              <motion.polyline points="170,95 180,130 185,155" stroke="#00d4ff" strokeWidth="1.5" fill="none"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.4 }} />
              {/* Joint dots */}
              {[[150,30],[110,60],[190,60],[85,90],[215,90],[125,95],[175,95],[80,120],[220,120]].map(([cx,cy], i) => (
                <motion.circle key={i} cx={cx} cy={cy} r="3" fill="#00d4ff"
                  animate={{ r: [3, 5, 3], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} />
              ))}
            </motion.g>
          </svg>

          {/* AI correction badges */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'rgba(0,255,128,0.15)', border: '1px solid rgba(0,255,128,0.4)', color: '#00ff80' }}>
            ✓ Plan Generated
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="absolute bottom-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'rgba(255,107,61,0.15)', border: '1px solid rgba(255,107,61,0.4)', color: '#ff6b3d' }}>
            ⚡ 45min Logged
          </motion.div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Calories', value: '847', unit: 'kcal', color: '#ff6b9d' },
            { label: 'Duration', value: '42', unit: 'min', color: '#00d4ff' },
            { label: 'Rep Score', value: '94', unit: '/100', color: '#9b59ff' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}<span className="text-xs text-white/40 font-normal">{stat.unit}</span>
              </motion.p>
              <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Progress chart */}
        <div className="rounded-xl p-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/50">Weekly Progress</span>
            <span className="text-xs font-medium" style={{ color: '#00d4ff' }}>+18% this week</span>
          </div>
          <div className="flex items-end gap-1 h-10">
            {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: i === 5 ? 'linear-gradient(to top, #00d4ff, #9b59ff)' : 'rgba(255,255,255,0.1)' }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.2 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating chat bubble */}
      <motion.div
        initial={{ x: 40, y: 20, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute -right-8 top-1/3 glass-card p-3 max-w-[180px] float-animation"
        style={{ border: '1px solid rgba(0,212,255,0.2)' }}>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
            <Brain size={12} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white/90 leading-relaxed">Your new training plan is ready. Shall we begin the session?</p>
            <p className="text-xs text-white/40 mt-1">AI Coach • just now</p>
          </div>
        </div>
      </motion.div>

      {/* Floating activity badge */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute -left-8 bottom-20 glass-card p-3 float-delayed"
        style={{ border: '1px solid rgba(155,89,255,0.2)' }}>
        <div className="flex items-center gap-2">
          <Activity size={16} style={{ color: '#9b59ff' }} />
          <div>
            <p className="text-xs font-semibold text-white">Heart Rate</p>
            <p className="text-xs" style={{ color: '#9b59ff' }}>148 bpm ↑</p>
          </div>
        </div>
      </motion.div>

      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#00d4ff]/10 pulse-ring"
            style={{
              width: `${i * 200}px`,
              height: `${i * 200}px`,
              top: `${-i * 100}px`,
              left: `${-i * 100}px`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const moveX = useTransform(springX, [0, 1], [-15, 15]);
  const moveY = useTransform(springY, [0, 1], [-10, 10]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-24 pb-20">
      {/* Background orbs */}
      <div className="absolute top-20 left-[10%] w-96 h-96 orb-blue pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-96 h-96 orb-purple pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 self-start mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
                <span className="w-2 h-2 rounded-full bg-[#00d4ff]" style={{ boxShadow: '0 0 8px #00d4ff', animation: 'pulse 2s infinite' }} />
                World's First BodyForgeAI Fitness Coach
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item} className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Your Personal <span className="gradient-text glow-blue">BodyForgeAI</span>
              <br />
              That <span className="text-white">Thinks,</span>
              <br />
              <span className="text-white/90">Coaches &amp;</span>{' '}
              <span className="gradient-text">Evolves</span>
              <br />
              <span className="text-white">With You.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={item} className="text-lg text-white/60 leading-relaxed mb-8 max-w-md">
              BodyForgeAI-generated workout plans, 24/7 coaching chat, precision meal tracking,
              and advanced progress analytics — all integrated in one agentic ecosystem.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#pricing" className="btn-primary px-8 py-4 text-base cursor-none flex items-center gap-2">
                <span>Start Free Trial</span>
                <ChevronRight size={18} />
              </a>
              <a href="#demo" className="btn-ghost px-8 py-4 text-base cursor-none flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Play size={14} className="text-white ml-0.5" fill="white" />
                </div>
                Watch Demo
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-black gradient-text">{s.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — dashboard */}
          <motion.div
            style={{ x: moveX, y: moveY }}
            className="relative"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #03030f, transparent)' }} />
    </section>
  );
}
