'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { ApiService } from '../types';

interface ApiStatusPanelProps {
  services: ApiService[];
}

const STATUS_STYLES: Record<string, { color: string; background: string; label: string }> = {
  operational: { color: '#00ff80', background: 'rgba(0,255,128,0.1)', label: 'Operational' },
  degraded: { color: '#ffb800', background: 'rgba(255,184,0,0.1)', label: 'Degraded' },
  down: { color: '#f87171', background: 'rgba(239,68,68,0.1)', label: 'Down' },
};

export function ApiStatusPanel({ services }: ApiStatusPanelProps) {
  const operationalCount = services.filter(s => s.status === 'operational').length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity size={16} style={{ color: '#00d4ff' }} />
          <h3 className="text-white font-bold text-sm">API Status Panel</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#00ff80' }}>
          <span className="w-2 h-2 rounded-full bg-[#00ff80]" style={{ boxShadow: '0 0 6px #00ff80', animation: 'pulse 2s infinite' }} />
          {operationalCount}/{services.length} Operational
        </div>
      </div>
      <div className="space-y-2.5">
        {services.map((svc, i) => {
          const st = STATUS_STYLES[svc.status] || STATUS_STYLES.operational;
          return (
            <motion.div key={svc.name}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.07 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: st.color, boxShadow: `0 0 6px ${st.color}80` }} />
              <p className="text-sm text-white/80 flex-1">{svc.name}</p>
              <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: st.background, color: st.color }}>{st.label}</span>
              <span className="text-xs text-white/30 w-12 text-right">{svc.latency}</span>
              <span className="text-xs text-white/20 w-14 text-right hidden sm:block">{svc.uptime}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
