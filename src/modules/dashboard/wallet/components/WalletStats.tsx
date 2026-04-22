'use client';

import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface WalletStatsProps {
  spent: number;
  credit: number;
}

export function WalletStats({ spent, credit }: WalletStatsProps) {
  return (
    <motion.div variants={item} className="grid grid-rows-3 gap-4">
      <div className="rounded-2xl p-4 flex items-center justify-between border border-white/5 bg-white/3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center border border-red-400/20">
            <ArrowDownRight className="text-red-400" size={20} />
          </div>
          <div>
            <p className="text-white/40 text-xs">Today Spent</p>
            <p className="text-white font-bold">${spent.toFixed(4)} USDC</p>
          </div>
        </div>
        <span className="text-[10px] text-red-400 pr-2">LIVE</span>
      </div>
      <div className="rounded-2xl p-4 flex items-center justify-between border border-white/5 bg-white/3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center border border-green-400/20">
            <ArrowUpRight className="text-green-400" size={20} />
          </div>
          <div>
            <p className="text-white/40 text-xs">Today Credit</p>
            <p className="text-white font-bold">${credit.toFixed(4)} USDC</p>
          </div>
        </div>
        <span className="text-[10px] text-green-400 pr-2">LIVE</span>
      </div>
      <div className="rounded-2xl p-4 flex items-center justify-between border border-white/5 bg-white/3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center border border-blue-400/20">
            <Wallet className="text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-white/40 text-xs">Wallet Status</p>
            <p className="text-white font-bold">Active</p>
          </div>
        </div>
        <span className="text-[10px] text-white/30 pr-2">SECURE</span>
      </div>
    </motion.div>
  );
}
