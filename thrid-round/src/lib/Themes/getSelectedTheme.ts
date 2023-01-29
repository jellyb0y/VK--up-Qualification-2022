import { IS_SERVER } from '@utils/isServer';

export const getSelectedTheme = (cookie: string = ''): string => {
  if (!cookie && !IS_SERVER) {
    cookie = document.cookie;
  }

  const cookieList = cookie.split(/\s?;\s?/);

  let theme = '';
  cookieList.some((line) => {
    const cookieTheme = line.match(/^theme=(.+)/)?.[1];
    if (cookieTheme) {
      theme = cookieTheme;
      return true;
    }
  });

  return theme;
};
