export interface ThemeProviderProps {
  scheme: Schemes;
  theme?: string;
}

export enum Schemes {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type Context = {
  scheme: Schemes;
  theme: string;
  setScheme: (scheme: Schemes) => void;
  setTheme: (theme: string) => void;
};

export type ThemeConfig = {
  color?: string;
  image?: string;
  scheme: Schemes;
};

export type ThemeRegistry = Record<string, ThemeConfig>;
