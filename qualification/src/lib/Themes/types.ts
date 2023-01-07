export interface ThemeProviderProps {
  cookie?: string;
}

export enum Themes {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type Context = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
};
