'use client';

import { motion } from 'framer-motion';
import { Cpu, ToggleLeft, ToggleRight } from 'lucide-react';
import { FeatureToggles } from '../types';

interface FeatureControlsProps {
  toggles: FeatureToggles;
  onToggle: (key: keyof FeatureToggles) => void;
}

const TOGGLE_ITEMS: { key: keyof FeatureToggles; label: string; desc: string; danger?: boolean }[] = [
  { key: 'aiCoach', label: 'AI Coach Chat', desc: 'Enable or disable the AI coaching chat feature for all users' },
  { key: 'poseDetection', label: 'Pose Detection', desc: 'Real-time computer vision posture analysis during workouts' },
  { key: 'mealScanner', label: 'Meal Scanner AI', desc: 'Food photo recognition and nutritional analysis' },
  { key: 'voiceTrainer', label: 'Voice AI Trainer', desc: 'Hands-free voice command interface during sessions' },
  { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Show maintenance page to all non-admin users', danger: true },
  { key: 'newUserSignups', label: 'New User Signups', desc: 'Allow new user registration on the platform' },
];

export function FeatureControls({ toggles, onToggle }: FeatureControlsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-2 mb-5">
        <Cpu size={16} style={{ color: '#9b59ff' }} />
        <h3 className="text-white font-bold text-sm">AI Feature Controls</h3>
      </div>
      <div className="space-y-3">
        {TOGGLE_ITEMS.map((item, i) => {
          const active = toggles[item.key];
          return (
            <motion.div key={item.key}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{
                background: item.danger && active ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${item.danger && active ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}`,
              }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full"
                  style={{ background: active ? (item.danger ? '#f87171' : '#00ff80') : 'rgba(255,255,255,0.15)' }} />
                <div>
                  <p className={`text-sm font-medium ${item.danger ? 'text-red-300' : 'text-white'}`}>{item.label}</p>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
              <button onClick={() => onToggle(item.key)}
                className="flex-shrink-0 ml-4">
                {active
                  ? <ToggleRight size={28} style={{ color: item.danger ? '#f87171' : '#9b59ff' }} />
                  : <ToggleLeft size={28} className="text-white/25" />}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
