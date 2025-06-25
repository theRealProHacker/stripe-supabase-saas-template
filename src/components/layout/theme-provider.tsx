'use client';

import React, { createContext, useContext } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeConfig } from '@/config/theme';

type ThemeMode = 'light' | 'dark' | 'custom';

interface ThemeContextType {
  mode: ThemeMode;
  customTheme: ThemeConfig | null;
  setTheme: (mode: ThemeMode, customTheme?: ThemeConfig) => void;
  toggleTheme: () => void;
  availableThemes: Record<string, ThemeConfig>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeHook = useTheme();

  return (
    <ThemeContext.Provider value={themeHook}>
      {children}
    </ThemeContext.Provider>
  );
};