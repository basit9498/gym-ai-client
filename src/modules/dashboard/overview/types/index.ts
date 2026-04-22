export interface UserStats {
  caloriesConsumed: number;
  caloriesGoal: number;
  streak: number;
  motivationScore: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  complete: boolean;
}

export interface WorkoutPlan {
  name: string;
  duration: number;
  exercises: Exercise[];
}

export interface WeeklyProgress {
  day: string;
  score: number;
}

export interface CalorieData {
  day: string;
  consumed: number;
  burned: number;
}

export interface OverviewData {
  userStats: UserStats;
  workoutPlan: WorkoutPlan | null;
  weeklyProgress: WeeklyProgress[];
  calorieData: CalorieData[];
}
