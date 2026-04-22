'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Copy, Check, CreditCard, Plus, TrendingUp } from 'lucide-react';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface WalletIdentityProps {
  address?: string;
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export function WalletIdentity({ address }: WalletIdentityProps) {
  const [copied, setCopied] = useState(false);

  return (
    <motion.div variants={item} className="rounded-3xl p-6 border border-white/5 bg-white/2 flex flex-col justify-between gap-6 overflow-hidden relative shadow-inner">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-400/10 flex items-center justify-center border border-blue-400/20 shadow-lg">
          <Wallet className="text-blue-400" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm">Wallet Identity</h4>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-white/40 text-[10px] truncate uppercase tracking-widest">{address || 'Loading Address...'}</p>
            <button 
            onClick={() => {
                copyToClipboard(address || '');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check size={10} className="text-green-400" /> : <Copy size={10} className="text-white/40" />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-2xl bg-[#0066ff]/10 border border-[#0066ff]/15 flex items-center justify-between group cursor-pointer hover:bg-[#0066ff]/20 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066ff] flex items-center justify-center shadow-lg shadow-[#0066ff]/20">
            <CreditCard className="text-white" size={16} />
          </div>
          <div>
            <span className="text-white/80 text-xs font-bold block leading-none">AI Training Card</span>
            <span className="text-white/30 text-[9px] uppercase tracking-tighter">Elite Member</span>
          </div>
        </div>
        <span className="text-[9px] font-black text-[#00d4ff] uppercase bg-[#00d4ff]/10 px-2 py-1 rounded-md border border-[#00d4ff]/20">Active</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-white/5 bg-white/3 flex flex-col gap-2 group hover:border-[#00d4ff]/30 transition-all cursor-pointer">
          <Plus size={16} className="text-[#00d4ff]" />
          <p className="text-white/80 font-black text-xs leading-none">Auto Saving</p>
          <p className="text-white/30 text-[9px]">2% Daily ROI</p>
        </div>
        <div className="p-4 rounded-2xl border border-white/15 bg-[#9b59ff]/10 flex flex-col gap-2 group hover:bg-[#9b59ff]/20 transition-all cursor-pointer">
          <TrendingUp size={16} className="text-[#9b59ff]" />
          <p className="text-[#9b59ff] font-black text-xs leading-none">Analytics</p>
          <p className="text-white/30 text-[9px]">View Insights</p>
        </div>
      </div>
    </motion.div>
  );
}
