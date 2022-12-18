import Cookies from 'js-cookie';

export const setSelectedTheme = (theme: string) => {
  Cookies.set('theme', theme);
};
