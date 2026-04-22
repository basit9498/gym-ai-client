// Mock data for the admin console — shaped like API responses for an easy backend swap

export const mockAdminStats = {
  totalUsers: 24817,
  activeToday: 3241,
  revenue: 148920,
  aiRequests: 892341,
};

export const mockUsers = [
  { id: 'u001', name: 'Alex Morgan', email: 'user@example.com', role: 'user', status: 'active', joined: '2025-01-15', plan: 'Pro' },
  { id: 'u002', name: 'Sarah Kim', email: 'sarah@example.com', role: 'user', status: 'active', joined: '2025-02-01', plan: 'Free' },
  { id: 'u003', name: 'Marcus Lee', email: 'marcus@example.com', role: 'user', status: 'inactive', joined: '2024-11-20', plan: 'Elite' },
  { id: 'u004', name: 'Priya Patel', email: 'priya@example.com', role: 'user', status: 'active', joined: '2025-03-10', plan: 'Pro' },
  { id: 'u005', name: 'James Walsh', email: 'james@example.com', role: 'user', status: 'active', joined: '2025-01-28', plan: 'Free' },
  { id: 'u006', name: 'Emma Chen', email: 'emma@example.com', role: 'user', status: 'active', joined: '2025-03-15', plan: 'Elite' },
  { id: 'u007', name: 'Tom Baker', email: 'tom@example.com', role: 'user', status: 'inactive', joined: '2024-12-05', plan: 'Pro' },
  { id: 'u008', name: 'Jordan Smith', email: 'admin@example.com', role: 'admin', status: 'active', joined: '2024-06-01', plan: 'Elite' },
];

export const mockUserGrowth = [
  { month: 'Oct', users: 8200 },
  { month: 'Nov', users: 11400 },
  { month: 'Dec', users: 14100 },
  { month: 'Jan', users: 17800 },
  { month: 'Feb', users: 20300 },
  { month: 'Mar', users: 22900 },
  { month: 'Apr', users: 24817 },
];

export const mockWorkoutTemplates = [
  { id: 'wt1', name: 'Beginner Full Body', level: 'Beginner', days: 3, exercises: 12, category: 'Strength' },
  { id: 'wt2', name: 'PPL 6-Day Split', level: 'Advanced', days: 6, exercises: 36, category: 'Hypertrophy' },
  { id: 'wt3', name: 'HIIT Cardio Blast', level: 'Intermediate', days: 4, exercises: 20, category: 'Cardio' },
  { id: 'wt4', name: 'Powerlifting Base', level: 'Advanced', days: 4, exercises: 16, category: 'Powerlifting' },
  { id: 'wt5', name: 'Yoga & Mobility', level: 'Beginner', days: 5, exercises: 25, category: 'Mobility' },
];

export const mockMealPlans = [
  { id: 'mp1', name: 'Lean Bulk 3200 kcal', goal: 'Muscle Gain', calories: 3200, protein: 200, meals: 5 },
  { id: 'mp2', name: 'Fat Loss 1800 kcal', goal: 'Weight Loss', calories: 1800, protein: 160, meals: 4 },
  { id: 'mp3', name: 'Maintenance 2400 kcal', goal: 'Maintain', calories: 2400, protein: 140, meals: 4 },
  { id: 'mp4', name: 'Competition Cut 1600 kcal', goal: 'Competition', calories: 1600, protein: 180, meals: 6 },
];
