export interface ThemeProviderProps {
  theme: Themes;
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
