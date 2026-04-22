'use client';

import { useState } from 'react';
import { settingsService } from '../services/settings.service';
import { ProfileData, PasswordData } from '../types';

export function useSettings() {
  const [tab, setTab] = useState('Profile');
  const [savedStatus, setSavedStatus] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (data: ProfileData) => {
    const res = await settingsService.updateProfile(data);
    if (res.success && res.data) {
      // Sync local session
      const sessionStr = localStorage.getItem('agentic_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        const updatedSession = { ...session, ...res.data };
        localStorage.setItem('agentic_session', JSON.stringify(updatedSession));
      }
    }
    return res;
  };

  const handleChangePassword = async (data: PasswordData) => {
    return await settingsService.changePassword(data);
  };

  return {
    tab,
    setTab,
    savedStatus,
    setSavedStatus,
    error,
    setError,
    handleUpdateProfile,
    handleChangePassword
  };
}
