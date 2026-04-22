'use client';

import { Search, Filter } from 'lucide-react';

interface FinanceControlsProps {
  search: string;
  typeFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

export function FinanceControls({ 
  search, 
  typeFilter, 
  statusFilter, 
  onSearchChange, 
  onTypeFilterChange, 
  onStatusFilterChange 
}: FinanceControlsProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input 
          value={search} 
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by hash, purpose, or note..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm outline-none placeholder-white/20 transition-all focus:ring-2 focus:ring-[#9b59ff]/20"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} 
        />
      </div>
      <div className="flex gap-4">
        <div className="relative">
            <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <select 
                value={typeFilter} 
                onChange={(e) => onTypeFilterChange(e.target.value)}
                className="pl-11 pr-10 py-3.5 rounded-2xl text-white text-sm outline-none appearance-none cursor-pointer hover:bg-white/5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <option value="all" className="bg-[#07071a]">All Types</option>
                <option value="transfer" className="bg-[#07071a]">Transfer</option>
                <option value="payment" className="bg-[#07071a]">Payment</option>
                <option value="deposit" className="bg-[#07071a]">Deposit</option>
            </select>
        </div>
        <div className="relative">
            <select 
                value={statusFilter} 
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="px-6 py-3.5 rounded-2xl text-white text-sm outline-none appearance-none cursor-pointer hover:bg-white/5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <option value="all" className="bg-[#07071a]">All Status</option>
                <option value="completed" className="bg-[#07071a]">Completed</option>
                <option value="pending" className="bg-[#07071a]">Pending</option>
                <option value="failed" className="bg-[#07071a]">Failed</option>
            </select>
        </div>
      </div>
    </div>
  );
}
