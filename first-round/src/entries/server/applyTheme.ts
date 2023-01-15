import { readFileSync, readdirSync } from 'fs';

import { ROOT_PATH } from '@constants';

const themes = readdirSync(ROOT_PATH).reduce((list, file) => {
  const themeName = file.match(/theme_([^.]+).css$/)?.[1];

  if (!themeName) {
    return list;
  }

  list[themeName] = readFileSync(`${ROOT_PATH}/${file}`).toString();

  return list;
}, {} as Record<string, string>);

export const applyTheme = (html: string, themeName?: string): string => {
  if (!themeName) {
    return html;
  }

  html = html.replace(/<body([^>]*)>/, `<body$1 theme="${themeName}">`);

  const themeContent = themes[themeName];

  if (!themeContent) {
    return html;
  }

  return html.replace(
    '</head>', `<style data-theme-name="${themeName}">${themeContent}</style></head>`
  );
};
