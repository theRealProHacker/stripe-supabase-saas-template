'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig, defaultThemes, applyCustomTheme } from '@/config/theme';

type ThemeMode = 'light' | 'dark' | 'custom';

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [customTheme, setCustomTheme] = useState<ThemeConfig | null>(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    const savedCustomTheme = localStorage.getItem('custom-theme');
    
    if (savedMode) {
      setMode(savedMode);
    }
    
    if (savedCustomTheme) {
      try {
        setCustomTheme(JSON.parse(savedCustomTheme));
      } catch (error) {
        console.error('Failed to parse custom theme:', error);
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'custom-theme');
    
    if (mode === 'custom' && customTheme) {
      applyCustomTheme(customTheme);
    } else {
      root.classList.add(mode);
    }
    
    // Save to localStorage
    localStorage.setItem('theme-mode', mode);
  }, [mode, customTheme]);

  const setTheme = (newMode: ThemeMode, newCustomTheme?: ThemeConfig) => {
    setMode(newMode);
    
    if (newMode === 'custom' && newCustomTheme) {
      setCustomTheme(newCustomTheme);
      localStorage.setItem('custom-theme', JSON.stringify(newCustomTheme));
    }
  };

  const toggleTheme = () => {
    setMode(current => current === 'light' ? 'dark' : 'light');
  };

  return {
    mode,
    customTheme,
    setTheme,
    toggleTheme,
    availableThemes: defaultThemes,
  };
};