'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FinanceStats } from './components/FinanceStats';
import { TransactionTable } from './components/TransactionTable';
import { FinanceControls } from './components/FinanceControls';
import { useFinance } from './hooks/useFinance';

export function FinanceModule() {
  const {
    transactions,
    stats,
    loading,
    page,
    totalPages,
    totalTransactions,
    search,
    typeFilter,
    statusFilter,
    handleSearchChange,
    handleTypeFilterChange,
    handleStatusFilterChange,
    handlePageChange,
  } = useFinance();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      {/* Topbar */}
      <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4"
        style={{ background: 'rgba(5,5,26,0.85)', borderBottom: '1px solid rgba(155,89,255,0.1)', backdropFilter: 'blur(20px)' }}>
        <h2 className="text-white font-bold text-lg flex-1">Global Finance Hub</h2>
        <div className="flex items-center gap-3">
            <span className="text-xs text-white/30 uppercase tracking-[0.2em] font-black">Audit Mode</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        <FinanceStats stats={stats} />

        <FinanceControls 
          search={search}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          onSearchChange={handleSearchChange}
          onTypeFilterChange={handleTypeFilterChange}
          onStatusFilterChange={handleStatusFilterChange}
        />

        <TransactionTable 
          transactions={transactions} 
          loading={loading} 
        />

        {/* Global Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-2 pt-2">
            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                Showing <span className="text-white">{transactions.length}</span> of <span className="text-white">{totalTransactions}</span> events
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex items-center gap-1.5 mx-2">
                 <span className="text-xs font-black text-white/40">PAGE</span>
                 <span className="text-sm font-black text-[#00d4ff] bg-[#00d4ff]/10 px-2.5 py-1 rounded-lg border border-[#00d4ff]/20">{page}</span>
                 <span className="text-xs font-black text-white/20">/ {totalPages}</span>
              </div>

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
