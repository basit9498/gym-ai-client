'use client';

import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface WalletBalanceProps {
  balance: number;
}

export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <motion.div variants={item} className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 h-64 flex flex-col justify-between shadow-2xl"
      style={{ 
        background: 'linear-gradient(135deg, #0066ff 0%, #9b59ff 100%)',
        boxShadow: '0 20px 50px rgba(0, 102, 255, 0.2)' 
      }}>
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-black/10 blur-2xl" />
      
      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-white/70 text-sm font-medium">Total Balance</p>
          <h2 className="text-5xl font-black text-white mt-2 tracking-tight">
            ${balance !== undefined ? balance : '0.00'} USDC
          </h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
          <CreditCard className="text-white" size={24} />
        </div>
      </div>

      <div className="relative flex gap-4">
        <button className="flex-1 bg-white text-[#0066ff] font-bold py-3 rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Add Funds
        </button>
        <button className="flex-1 bg-white/20 backdrop-blur-md text-white font-bold py-3 rounded-2xl border border-white/30 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Withdraw
        </button>
      </div>
    </motion.div>
  );
}
