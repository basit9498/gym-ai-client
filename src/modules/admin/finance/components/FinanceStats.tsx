'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Activity, Clock } from 'lucide-react';
import { FinanceStats as IFinanceStats } from '../types';

interface FinanceStatsProps {
  stats: IFinanceStats;
}

export function FinanceStats({ stats }: FinanceStatsProps) {
  const successRate = stats.count > 0 ? (stats.successful / stats.count * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
         className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] shadow-xl relative overflow-hidden group">
         <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#00d4ff]/10 blur-3xl group-hover:bg-[#00d4ff]/20 transition-all" />
         <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center border border-[#00d4ff]/20">
               <TrendingUp size={20} className="text-[#00d4ff]" />
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Total Transaction Volume</p>
         </div>
         <h3 className="text-3xl font-black text-white">{stats.totalVolume.toLocaleString()} <span className="text-[10px] text-white/30 ml-1 font-bold">USDC</span></h3>
       </motion.div>

       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
         className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] shadow-xl relative overflow-hidden group">
         <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#9b59ff]/10 blur-3xl group-hover:bg-[#9b59ff]/20 transition-all" />
         <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#9b59ff]/10 flex items-center justify-center border border-[#9b59ff]/20">
               <Activity size={20} className="text-[#9b59ff]" />
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Global Success Rate</p>
         </div>
         <h3 className="text-3xl font-black text-white">{successRate}% <span className="text-[10px] text-white/30 ml-1 font-bold">STABLE</span></h3>
       </motion.div>

       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
         className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] shadow-xl relative overflow-hidden group">
         <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 blur-3xl group-hover:bg-white/10 transition-all" />
         <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
               <Clock size={20} className="text-white/40" />
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Transaction Count</p>
         </div>
         <h3 className="text-3xl font-black text-white">{stats.count} <span className="text-[10px] text-white/30 ml-1 font-bold">ENTRIES</span></h3>
       </motion.div>
    </div>
  );
}
