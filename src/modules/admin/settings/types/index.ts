export interface ApiService {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency: string;
  uptime: string;
}

export interface FeatureToggles {
  aiCoach: boolean;
  poseDetection: boolean;
  mealScanner: boolean;
  voiceTrainer: boolean;
  maintenanceMode: boolean;
  newUserSignups: boolean;
}
