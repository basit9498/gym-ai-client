export interface WeeklyStat {
  week: string;
  weight: number;
  bodyFatStart?: number;
}

export interface ProgressData {
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  bodyFatStart: number;
  bodyFatCurrent: number;
  muscleMassStart: number;
  muscleMassCurrent: number;
  weeklyStats: WeeklyStat[];
}
