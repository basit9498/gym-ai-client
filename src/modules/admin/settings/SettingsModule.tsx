'use client';

import { useState } from 'react';
import { FeatureControls } from './components/FeatureControls';
import { ApiStatusPanel } from './components/ApiStatusPanel';
import { FeatureToggles, ApiService } from './types';
import { AdminTopbar } from '../components/AdminTopbar';

const API_SERVICES: ApiService[] = [
  { name: 'AI Inference API', status: 'operational', latency: '42ms', uptime: '99.98%' },
  { name: 'Pose Detection Engine', status: 'operational', latency: '18ms', uptime: '99.95%' },
  { name: 'Nutrition Scanner API', status: 'degraded', latency: '210ms', uptime: '97.2%' },
  { name: 'User Auth Service', status: 'operational', latency: '8ms', uptime: '100%' },
  { name: 'Database Cluster', status: 'operational', latency: '3ms', uptime: '99.99%' },
  { name: 'Voice AI Service', status: 'operational', latency: '65ms', uptime: '99.7%' },
];

export function SettingsModule() {
  const [toggles, setToggles] = useState<FeatureToggles>({
    aiCoach: true,
    poseDetection: true,
    mealScanner: true,
    voiceTrainer: true,
    maintenanceMode: false,
    newUserSignups: true,
  });

  const handleToggle = (key: keyof FeatureToggles) => {
    setToggles(t => ({ ...t, [key]: !t[key] }));
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#05051a]">
      <AdminTopbar title="System Settings" />

      <div className="flex-1 p-6 space-y-6">
        <FeatureControls toggles={toggles} onToggle={handleToggle} />
        <ApiStatusPanel services={API_SERVICES} />
      </div>
    </div>
  );
}
