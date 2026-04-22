'use client';

import { Search, Filter } from 'lucide-react';

interface UserSearchProps {
  search: string;
  filter: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export function UserSearch({ search, filter, onSearchChange, onFilterChange }: UserSearchProps) {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4">
      <div className="relative col-span-12 sm:col-span-8 lg:col-span-9">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input 
          value={search} 
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users by name or email…"
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm outline-none placeholder-white/20 transition-all focus:ring-2 focus:ring-[#9b59ff]/20"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} 
        />
      </div>
      <div className="relative col-span-12 sm:col-span-4 lg:col-span-3">
        <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <select 
          value={filter} 
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-white text-sm outline-none appearance-none cursor-pointer transition-all hover:bg-white/5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <option value="all" className="bg-[#07071a]">All Roles</option>
          <option value="admin" className="bg-[#07071a]">Admins</option>
          <option value="user" className="bg-[#07071a]">Users</option>
        </select>
      </div>
    </div>
  );
}
