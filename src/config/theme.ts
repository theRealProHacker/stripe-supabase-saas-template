export interface ThemeConfig {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    accent: string;
    emphasis: string;
  };
}

export const defaultThemes: Record<string, ThemeConfig> = {
  light: {
    name: 'Light',
    colors: {
      background: '45 25% 95%',
      foreground: '220 85% 15%',
      primary: '220 85% 25%',
      accent: '35 85% 65%',
      emphasis: '35 85% 55%',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '220 15% 8%',
      foreground: '0 0% 100% / 0.87',
      primary: '0 0% 100% / 0.87',
      accent: '35 85% 65%',
      emphasis: '35 85% 65%',
    },
  },
};

export const applyCustomTheme = (theme: ThemeConfig) => {
  const root = document.documentElement;
  root.style.setProperty('--custom-background', theme.colors.background);
  root.style.setProperty('--custom-foreground', theme.colors.foreground);
  root.style.setProperty('--custom-primary', theme.colors.primary);
  root.style.setProperty('--custom-accent', theme.colors.accent);
  root.style.setProperty('--custom-emphasis', theme.colors.emphasis);
  root.classList.add('custom-theme');
};