import type { ThemeConfig, ThemeRegistry } from './types';

export const Registry: ThemeRegistry = {};

export const registerTheme = (themeName: string, config: ThemeConfig) => {
  Registry[themeName] = config;
};

export const getThemeConfig = (themeName: string) => Registry[themeName];
