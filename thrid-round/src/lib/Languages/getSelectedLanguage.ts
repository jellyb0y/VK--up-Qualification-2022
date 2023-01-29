import { IS_SERVER } from '@utils/isServer';
import { Languages } from './types';

export const getSelectedLang = (cookie: string = ''): Languages => {
  if (!cookie && !IS_SERVER) {
    cookie = document.cookie;
  }

  const cookieList = cookie.split(/\s?;\s?/);

  let lang: Languages;
  cookieList.some((line) => {
    const cookieLang = line.match(/^lang=(.+)/)?.[1];
    if (cookieLang) {
      lang = cookieLang as Languages;
      return true;
    }
  });

  return lang;
};
