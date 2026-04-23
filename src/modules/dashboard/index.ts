export { default as DashboardSidebar } from './components/Sidebar';
export { default as DashboardTopbar } from './components/Topbar';
export { default as StatCard } from './components/StatCard';
export * from './data/dashboard-mocks';
export { topbarNotifications } from './data/topbar-notifications';
export * from './overview';
// Handle workout exports explicitly to avoid collisions with overview
export { WorkoutModule } from './workout/WorkoutModule';
export { workoutService } from './workout/services/workout.service';
export { useWorkout } from './workout/hooks/useWorkout';
export type { WorkoutSession, Exercise as WorkoutExercise, WorkoutPlan as DetailedWorkoutPlan } from './workout/types';

export * from './ai-coach';
export * from './meal-tracker';
export * from './progress';
export * from './wallet';
export * from './settings';
