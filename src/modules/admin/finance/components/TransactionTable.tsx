'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import { Transaction } from '../types';

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  deposit: { bg: 'rgba(0,212,255,0.08)', text: '#00d4ff' },
  transfer: { bg: 'rgba(155,89,255,0.12)', text: '#9b59ff' },
  payment: { bg: 'rgba(0,255,128,0.08)', text: '#00ff80' },
  withdrawal: { bg: 'rgba(239,68,68,0.1)', text: '#f87171' },
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  completed: { bg: 'rgba(0,255,128,0.1)', text: '#00ff80' },
  pending: { bg: 'rgba(255,184,0,0.1)', text: '#ffb800' },
  failed: { bg: 'rgba(239,68,68,0.1)', text: '#f87171' },
};

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
}

export function TransactionTable({ transactions, loading }: TransactionTableProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden shadow-2xl" 
      style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
    >
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/[0.02]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="col-span-3">Entity Flow</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2 text-right">Amount</div>
        <div className="col-span-3">Status / Date</div>
        <div className="col-span-2 text-right">Blockchain</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.03] min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#05051a]/50 backdrop-blur-sm z-10"
            >
              <Loader2 className="animate-spin text-[#00d4ff] mb-2" size={32} />
              <p className="text-white/40 text-xs font-medium">Syncing Ledger History...</p>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <motion.div key={tx._id}
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-white/[0.02] transition-all group"
                  >
                    <div className="col-span-3 flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg ${
                         tx.status === 'completed' ? 'bg-green-400/5 border-green-400/10' : 'bg-white/5 border-white/10'
                       }`}>
                         {tx.type === 'withdrawal' || (tx.fromUserId && !tx.toUserId) ? (
                           <ArrowUpRight size={18} className="text-white/40" />
                         ) : (
                           <ArrowDownRight size={18} className="text-[#00ff80]" />
                         )}
                       </div>
                       <div className="min-w-0">
                         <p className="text-xs font-bold text-white truncate group-hover:text-[#00d4ff] transition-all">
                           {tx.fromUserId?.name || 'System'} → {tx.toUserId?.name || 'External'}
                         </p>
                         <p className="text-[9px] text-white/20 uppercase font-bold truncate mt-0.5">{tx.purpose || 'General Transfer'}</p>
                       </div>
                    </div>

                    <div className="col-span-2">
                       <span className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border"
                         style={TYPE_COLORS[tx.type] || { bg: 'rgba(255,255,255,0.05)', text: '#fff' }}>
                         {tx.type}
                       </span>
                    </div>

                    <div className="col-span-2 text-right">
                       <p className="text-sm font-black text-white">{tx.amount.toLocaleString()} <span className="text-[10px] text-white/20">USDC</span></p>
                    </div>

                    <div className="col-span-3 flex items-center gap-4">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest"
                            style={{ color: STATUS_COLORS[tx.status]?.text }}>{tx.status}</span>
                          <span className="text-[10px] text-white/20 font-medium">
                            {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                       </div>
                    </div>

                    <div className="col-span-2 text-right">
                       <div className="flex flex-col items-end">
                          <span className="text-[9px] text-white/30 font-black uppercase tracking-tighter">{tx.blockchain}</span>
                          <p className="text-[8px] text-white/10 font-mono truncate max-w-[80px]">{tx.txHash || 'PENDING_HASH'}</p>
                       </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-white/20">
                  <BarChart3 size={40} className="mb-4 opacity-10" />
                  <p className="text-sm italic">No financial movements detected in this record.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
