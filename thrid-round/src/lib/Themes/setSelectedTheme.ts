import Cookies from 'js-cookie';

export const setSelectedTheme = (theme: string | null) => {
  Cookies.set('theme', theme);

  if (!theme) {
    document.body.setAttribute('theme', '');
    return;
  }

  const links = document.head.querySelectorAll('*[data-theme-name]');

  const isSuchLinkExist = Array.from(links).some((elem) => (
    elem.getAttribute('data-theme-name') === theme
  ));

  if (isSuchLinkExist) {
    document.body.setAttribute('theme', theme);
    return;
  }

  const newLink = document.createElement('link');
  newLink.setAttribute('data-theme-name', theme);
  newLink.setAttribute('rel', 'stylesheet');
  newLink.setAttribute('href', `/static/theme_${theme}.css`);

  newLink.onload = () => {
    document.body.setAttribute('theme', theme);
  };

  document.head.appendChild(newLink);
};
