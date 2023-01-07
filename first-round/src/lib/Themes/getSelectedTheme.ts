import { IS_SERVER } from '@utils/isServer';
import { Themes } from './types';

export const getSelectedTheme = (cookie: string = ''): Themes => {
  if (!cookie && !IS_SERVER) {
    cookie = document.cookie;
  }

  const cookieList = cookie.split(/\s?;\s?/);

  let theme: Themes = Themes.System;
  cookieList.some((line) => {
    const cookieTheme = line.match(/^theme=(.+)/)?.[1] as (Themes | undefined);
    if (cookieTheme === Themes.Dark || cookieTheme === Themes.Light) {
      theme = cookieTheme;
      return true;
    }
  });

  return theme;
};
