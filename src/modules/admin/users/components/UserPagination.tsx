'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface UserPaginationProps {
  page: number;
  totalPages: number;
  totalUsers: number;
  currentUsersCount: number;
  onPageChange: (page: number) => void;
}

export function UserPagination({ 
  page, 
  totalPages, 
  totalUsers, 
  currentUsersCount,
  onPageChange 
}: UserPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 pt-2">
      <p className="text-xs text-white/30">
        Showing <span className="text-white font-bold">{currentUsersCount}</span> of <span className="text-white font-bold">{totalUsers}</span> candidates
      </p>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex items-center gap-1.5 mx-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`min-w-[36px] h-9 rounded-xl text-xs font-black transition-all ${
                page === p 
                  ? 'bg-[#9b59ff] text-white shadow-lg shadow-[#9b59ff]/30' 
                  : 'text-white/30 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
