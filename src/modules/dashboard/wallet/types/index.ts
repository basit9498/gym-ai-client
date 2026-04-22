export interface Transaction {
  _id: string;
  amount: number;
  fromUserId: string;
  toUserId: string;
  createdAt: string;
  purpose: string;
  status: string;
}

export interface WalletDetail {
  balance: number;
  wallet: {
    address: string;
    blockchain?: string;
  };
  transactions: Transaction[];
  stats: {
    spentToday: number;
    creditToday: number;
  };
  chartData: {
    date: string;
    amount: number;
  }[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalTransactions: number;
  };
}

export interface ChartDataPoint {
  day: string;
  amount: number;
}
