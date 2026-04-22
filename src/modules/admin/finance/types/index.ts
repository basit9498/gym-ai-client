export interface Transaction {
  _id: string;
  fromUserId?: {
    name: string;
  };
  toUserId?: {
    name: string;
  };
  amount: number;
  type: 'deposit' | 'transfer' | 'payment' | 'withdrawal';
  status: 'completed' | 'pending' | 'failed';
  purpose?: string;
  blockchain?: string;
  txHash?: string;
  createdAt: string;
}

export interface FinanceStats {
  totalVolume: number;
  count: number;
  successful: number;
}

export interface AdminTransactionsResult {
  success: boolean;
  data: {
    transactions: Transaction[];
    stats: FinanceStats;
    page: number;
    totalPages: number;
    totalTransactions: number;
  };
  error: string;
}

export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}
