// Mock data for the user dashboard — shaped like API responses for an easy backend swap

export const mockWorkoutPlan = {
  date: new Date().toISOString().split('T')[0],
  name: 'Push Day — Chest & Triceps',
  duration: 55,
  calories: 420,
  exercises: [
    { id: 1, name: 'Bench Press', sets: 4, reps: 8, weight: '80kg', complete: false, muscleGroup: 'Chest' },
    { id: 2, name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: '30kg', complete: false, muscleGroup: 'Chest' },
    { id: 3, name: 'Cable Flyes', sets: 3, reps: 15, weight: '15kg', complete: true, muscleGroup: 'Chest' },
    { id: 4, name: 'Tricep Dips', sets: 3, reps: 12, weight: 'BW', complete: false, muscleGroup: 'Triceps' },
    { id: 5, name: 'Skull Crushers', sets: 3, reps: 10, weight: '25kg', complete: false, muscleGroup: 'Triceps' },
    { id: 6, name: 'Overhead Tricep Extension', sets: 3, reps: 12, weight: '20kg', complete: true, muscleGroup: 'Triceps' },
  ],
};

export const mockUserStats = {
  streak: 14,
  caloriesConsumed: 1847,
  caloriesGoal: 2400,
  caloriesBurned: 420,
  motivationScore: 87,
  weeklyGoalProgress: 68,
};

export const mockWeeklyProgress = [
  { day: 'Mon', calories: 380, score: 72 },
  { day: 'Tue', calories: 445, score: 85 },
  { day: 'Wed', calories: 290, score: 58 },
  { day: 'Thu', calories: 520, score: 91 },
  { day: 'Fri', calories: 410, score: 78 },
  { day: 'Sat', calories: 480, score: 88 },
  { day: 'Sun', calories: 420, score: 87 },
];

export const mockCalorieData = [
  { day: 'Mon', consumed: 2100, burned: 380 },
  { day: 'Tue', consumed: 1980, burned: 445 },
  { day: 'Wed', consumed: 2300, burned: 290 },
  { day: 'Thu', consumed: 1750, burned: 520 },
  { day: 'Fri', consumed: 2050, burned: 410 },
  { day: 'Sat', consumed: 2200, burned: 480 },
  { day: 'Sun', consumed: 1847, burned: 420 },
];

export const mockMeals = [
  { id: 1, name: 'Greek Yogurt + Berries', time: '07:30', calories: 220, protein: 18, carbs: 28, fat: 4 },
  { id: 2, name: 'Chicken Rice Bowl', time: '12:00', calories: 580, protein: 45, carbs: 65, fat: 12 },
  { id: 3, name: 'Protein Shake', time: '15:30', calories: 180, protein: 30, carbs: 8, fat: 2 },
  { id: 4, name: 'Salmon & Veggies', time: '19:00', calories: 450, protein: 38, carbs: 22, fat: 18 },
];

export const mockAiMessages = [
  { id: 1, role: 'ai', text: "Hey Alex! Great squat session yesterday 💪 Ready to crush chest day?", time: '09:00' },
  { id: 2, role: 'user', text: "Yeah! A bit sore from legs but feeling good.", time: '09:01' },
  { id: 3, role: 'ai', text: "Normal DOMS — your quads adapted well. Start bench press at 75% today and increase next session. I'll auto-adjust based on your performance. 🎯", time: '09:01' },
  { id: 4, role: 'user', text: "What about nutrition before the workout?", time: '09:03' },
  { id: 5, role: 'ai', text: "Have 30g fast carbs + 20g protein 45 min before. A banana + protein shake is perfect. Your glycogen needs refueling after leg day. 🍌", time: '09:03' },
];

export const mockProgressData = {
  startWeight: 85,
  currentWeight: 79,
  goalWeight: 75,
  bodyFatStart: 22,
  bodyFatCurrent: 17,
  muscleMassStart: 62,
  muscleMassCurrent: 66,
  weeklyStats: [
    { week: 'W1', weight: 85, fat: 22 },
    { week: 'W2', weight: 84, fat: 21.5 },
    { week: 'W3', weight: 83, fat: 20.8 },
    { week: 'W4', weight: 82, fat: 20 },
    { week: 'W5', weight: 81, fat: 19 },
    { week: 'W6', weight: 80, fat: 18 },
    { week: 'W7', weight: 79, fat: 17 },
  ],
};
