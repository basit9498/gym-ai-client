export interface MealItem {
  foodName: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  _id: string;
  title: string;
  mealType: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  items: MealItem[];
}

export interface DayNutrition {
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: {
    caloriesTarget: number;
    proteinTarget: number;
    carbsTarget: number;
    fatTarget: number;
    waterTarget: number;
  };
  meals: Meal[];
}
