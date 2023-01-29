import Cookies from 'js-cookie';

import type { Schemes } from './types';

export const setSelectedScheme = (scheme: Schemes) => {
  Cookies.set('scheme', scheme);
  document.body.setAttribute('scheme', scheme);
};
