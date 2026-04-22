export interface Exercise {
  _id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  isCompleted: boolean;
}

export interface WorkoutSession {
  _id: string;
  dayName: string;
  title: string;
  estimatedMinutes: number;
  focusArea: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  _id: string;
  title: string;
  sessions: WorkoutSession[];
}
