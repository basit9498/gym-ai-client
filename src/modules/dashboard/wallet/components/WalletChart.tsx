'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Plus, CreditCard } from 'lucide-react';
import { ChartDataPoint } from '../types';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface WalletChartProps {
  chartData: ChartDataPoint[];
}

export function WalletChart({ chartData }: WalletChartProps) {
  const maxChartAmount = Math.max(...chartData.map(d => d.amount), 0.005);

  return (
    <motion.div variants={item} className="rounded-3xl p-6 border border-white/5 bg-white/2 overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-xs opacity-50">Spending Flow</h3>
          <p className="text-white/80 text-sm mt-1">Weekly transaction volume</p>
        </div>
        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
          <TrendingUp size={16} className="text-blue-400" />
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-2 h-48 relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-5 py-2 pointer-events-none">
          <div className="h-px bg-white w-full" />
          <div className="h-px bg-white w-full" />
          <div className="h-px bg-white w-full" />
          <div className="h-px bg-white w-full" />
        </div>

        {chartData.map((d, i) => {
          const getHeight = (amount: number, max: number) => {
            if (amount <= 0) return 2;
            const min = 1e-6;
            const logMin = Math.log10(min);
            const logMax = Math.log10(max + min);
            const logVal = Math.log10(amount + min);
            const normalized = (logVal - logMin) / (logMax - logMin);
            return Math.max(normalized * 100, 2);
          };

          const visualHeight = getHeight(d.amount, maxChartAmount);
          
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-3 group relative">
              <motion.div 
                className="w-full rounded-2xl relative shadow-[0_0_15px_rgba(0,102,255,0.1)]"
                initial={{ height: 0 }}
                animate={{ height: `${visualHeight}%` }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                style={{ 
                  background: d.amount > 0 
                      ? 'linear-gradient(to top, #0066ff, #9b59ff)' 
                      : 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: d.amount > 0 ? '0 0 20px rgba(0,102,255,0.15)' : 'none'
                }}
              >
                <div
                  className="w-full rounded-2xl relative"
                  style={{
                    height: `${visualHeight}%`,
                    minHeight: d.amount > 0 ? '2px' : '1px',
                  }}
                />
                
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0066ff] px-2 py-1 rounded-lg text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-10 shadow-xl border border-blue-100">
                  {d.amount.toFixed(4)} USDC
                </div>
              </motion.div>
              <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${d.amount > 0 ? 'text-white/60' : 'text-white/20'}`}>
                  {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
