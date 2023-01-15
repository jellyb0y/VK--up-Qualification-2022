import { IS_SERVER } from '@utils/isServer';
import { Schemes } from './types';

export const getSelectedScheme = (cookie: string = ''): Schemes => {
  if (!cookie && !IS_SERVER) {
    cookie = document.cookie;
  }

  const cookieList = cookie.split(/\s?;\s?/);

  let scheme: Schemes = Schemes.System;
  cookieList.some((line) => {
    const cookieScheme = line.match(/^scheme=(.+)/)?.[1] as (Schemes | undefined);
    if (cookieScheme === Schemes.Dark || cookieScheme === Schemes.Light) {
      scheme = cookieScheme;
      return true;
    }
  });

  return scheme;
};
