import { useCallback, useEffect, useMemo, useState } from 'react';
import { Context } from './context';

import { setSelectedScheme } from './setSelectedScheme';
import { setSelectedTheme } from './setSelectedTheme';

import { Schemes } from './types';

import type { ThemeProviderProps } from './types';
import type { FC } from 'react';
import { getThemeConfig } from './themeRegistry';

export const ThemeProvider: FC<ThemeProviderProps> = ({
  scheme: selectedScheme,
  theme: selectedTheme,
  children,
}) => {
  const [scheme, setScheme] = useState<Schemes>(selectedScheme);
  const [theme, setTheme] = useState<string>(selectedTheme);

  useEffect(() => {
    setSelectedScheme(selectedScheme);
    setSelectedTheme(selectedTheme);
  }, []);

  const onChangeScheme = useCallback((scheme: Schemes) => {
    setScheme(scheme);
    setTheme('');

    setSelectedTheme('');
    setSelectedScheme(scheme);
  }, []);

  const onChangeTheme = useCallback((theme: string | null) => {
    const themeScheme = getThemeConfig(theme)?.scheme || scheme;

    setTheme(theme);
    setScheme(themeScheme);

    setSelectedTheme(theme);
    setSelectedScheme(themeScheme);
  }, []);

  const context = useMemo(() => ({
    theme,
    scheme,
    setScheme: onChangeScheme,
    setTheme: onChangeTheme,
  }), [scheme, theme, onChangeScheme, onChangeTheme]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};
