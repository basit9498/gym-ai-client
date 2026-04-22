'use client';

import { UserTable } from './components/UserTable';
import { UserSearch } from './components/UserSearch';
import { UserPagination } from './components/UserPagination';
import { useUsers } from './hooks/useUsers';

export function AdminUsersModule() {
  const {
    users,
    loading,
    page,
    totalPages,
    totalUsers,
    search,
    filter,
    handleSearchChange,
    handleFilterChange,
    handlePageChange,
  } = useUsers();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      {/* Topbar */}
      <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4"
        style={{ background: 'rgba(5,5,26,0.85)', borderBottom: '1px solid rgba(155,89,255,0.1)', backdropFilter: 'blur(20px)' }}>
        <h2 className="text-white font-bold text-lg flex-1">Users Management</h2>
        <div className="flex items-center gap-3">
            <span className="text-sm text-white/40">{totalUsers} Users Total</span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-xs text-[#9b59ff] font-bold uppercase tracking-tighter">Admin Panel</span>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        <UserSearch 
          search={search} 
          filter={filter} 
          onSearchChange={handleSearchChange} 
          onFilterChange={handleFilterChange} 
        />

        <UserTable 
          users={users} 
          loading={loading} 
        />

        {!loading && (
          <UserPagination 
            page={page} 
            totalPages={totalPages} 
            totalUsers={totalUsers} 
            currentUsersCount={users.length} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>
    </div>
  );
}
