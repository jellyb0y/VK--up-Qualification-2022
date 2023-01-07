import { useCallback, useMemo, useState } from 'react';
import { Context } from './context';

import { getSelectedTheme } from './getSelectedTheme';
import { setSelectedTheme } from './setSelectedTheme';

import { Themes } from './types';
import { IS_SERVER } from '@utils/isServer';

import type { ThemeProviderProps } from './types';
import type { FC } from 'react';

export const ThemeProvider: FC<ThemeProviderProps> = ({ cookie, children }) => {
  const [theme, setTheme] = useState<Themes>(getSelectedTheme(cookie));

  const onChangeTheme = useCallback((theme: Themes) => {
    setTheme(theme);

    if (!IS_SERVER) {
      setSelectedTheme(theme);
      document.body.setAttribute('scheme', theme);
    }
  }, []);

  const context = useMemo(() => ({
    theme,
    setTheme: onChangeTheme,
  }), [theme, onChangeTheme]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};
