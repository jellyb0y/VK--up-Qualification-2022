import Cookies from 'js-cookie';

export const setSelectedTheme = (lang: string | null) => {
  Cookies.set('lang', lang);
};
