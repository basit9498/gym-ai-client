'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { Transaction } from '../types';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface WalletTransactionsProps {
  transactions: Transaction[];
  userId?: string;
  pagination?: {
    page: number;
    totalPages: number;
    totalTransactions: number;
  };
  onPageChange?: (page: number) => void;
}

export function WalletTransactions({ transactions, userId, pagination, onPageChange }: WalletTransactionsProps) {
  return (
    <motion.div variants={item} className="rounded-3xl border border-white/5 bg-white/2 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-bold">Transaction History</h3>
          {pagination && (
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/40 border border-white/10 uppercase font-black">
              {pagination.totalTransactions} Total
            </span>
          )}
        </div>
        <button className="text-white/30 hover:text-white transition-all">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-white/30 uppercase tracking-widest bg-white/2">
              <th className="px-6 py-4 font-black">Transaction</th>
              <th className="px-6 py-4 font-black">Detail</th>
              <th className="px-6 py-4 font-black">Date</th>
              <th className="px-6 py-4 font-black">Status</th>
              <th className="px-6 py-4 font-black text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.length > 0 ? (
              transactions.map((t: any) => {
                const isOutflow = t.fromUserId === userId;
                const dateObj = new Date(t.createdAt);
                const dateLabel = !isNaN(dateObj.getTime()) 
                  ? dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                  : 'Unknown Date';
                
                return (
                  <tr key={t._id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          isOutflow 
                          ? 'bg-white/5 border-white/10 text-white/60' 
                          : 'bg-green-400/10 border-green-400/20 text-green-400'
                        }`}>
                          {isOutflow ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{isOutflow ? 'Transfer Sent' : 'Transfer Received'}</p>
                          <p className="text-white/30 text-[10px] uppercase tracking-tighter">ID: ...{t._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-white/20" />
                        <span className="text-white/40 text-xs">{t.purpose}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-white/40 text-xs font-medium">
                      {dateLabel}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] px-2 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20 font-bold uppercase">
                        {t.status}
                      </span>
                    </td>
                    <td className={`px-6 py-5 text-right font-black text-sm ${isOutflow ? 'text-white' : 'text-green-400'}`}>
                      {isOutflow ? '-' : '+'}${t.amount}
                    </td>
                  </tr>
                );
              })
            ) : (
                <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-white/20 italic text-sm">
                        No transactions found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && pagination.totalPages > 1 && (
        <div className="p-4 bg-white/2 flex items-center justify-between border-t border-white/5">
            <p className="text-xs text-white/30 font-medium">
                Page <span className="text-white/60">{pagination.page}</span> of <span className="text-white/60">{pagination.totalPages}</span>
            </p>
            <div className="flex gap-2">
                <button 
                    disabled={pagination.page <= 1}
                    onClick={() => onPageChange?.(pagination.page - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white border border-white/10"
                >
                    Previous
                </button>
                <button 
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => onPageChange?.(pagination.page + 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#0066ff] hover:bg-[#0055dd] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
                >
                    Next
                </button>
            </div>
        </div>
      )}
    </motion.div>
  );
}
