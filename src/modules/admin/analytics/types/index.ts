export interface GrowthTrend {
  date: string;
  users: number;
}

export interface RecentActivity {
  msg: string;
  time: string;
  type: 'info' | 'warn' | 'ok';
}

export interface AdminOverviewData {
  totalUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  aiRequests: number;
  activeToday: number;
  growthTrend: GrowthTrend[];
  recentActivity: RecentActivity[];
}

export interface AdminOverviewResult {
  success: boolean;
  data: AdminOverviewData;
  error: string;
}
