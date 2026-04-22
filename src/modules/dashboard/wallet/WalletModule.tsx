'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import DashboardTopbar from '../components/Topbar';
import { useWallet } from './hooks/useWallet';
import { WalletBalance } from './components/WalletBalance';
import { WalletStats } from './components/WalletStats';
import { WalletChart } from './components/WalletChart';
import { WalletIdentity } from './components/WalletIdentity';
import { WalletTransactions } from './components/WalletTransactions';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function WalletModule() {
  const { walletDetail, loading, userId, transactions, chartData, todayStats, pagination, handlePageChange } = useWallet();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardTopbar title="Wallet" />

      {walletDetail ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 p-6 space-y-6"
        >
          {/* Top Section - Balance & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WalletBalance balance={walletDetail.balance} />
            <WalletStats spent={todayStats.spent} credit={todayStats.credit} />
          </div>

          {/* Mid Section - Transactions & Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <WalletChart chartData={chartData} />
            <WalletIdentity address={walletDetail?.wallet?.address} />
          </div>

          {/* Transaction Table */}
          <WalletTransactions 
            transactions={transactions} 
            userId={userId} 
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="text-white/30" size={24} />
        </div>
      )}
    </div>
  );
}
