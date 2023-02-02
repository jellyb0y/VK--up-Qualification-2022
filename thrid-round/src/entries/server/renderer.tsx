import { indexHTML, prerenders } from './prerenders';
import { getSelectedScheme } from '@lib/Themes/getSelectedScheme';
import { getSelectedTheme } from '@lib/Themes/getSelectedTheme';
import { matchUrl } from '@utils/matchUrl';
import Server from '@lib/Server';
import { getThemeConfig } from '@lib/Themes/themeRegistry';
import { applyTheme } from './applyTheme';
import { getSelectedLang } from '@lib/Languages/getSelectedLanguage';
import { Languages } from '@lib/Languages/types';

export const rendererRouter = Server.route();

rendererRouter.get('*', async (req, res) => {
  try {
    const lang = getSelectedLang(req.headers.cookie) || Languages.Ru;
    const theme = getSelectedTheme(req.headers.cookie);
    const themeConfig = getThemeConfig(theme);
    const scheme = themeConfig?.scheme || getSelectedScheme(req.headers.cookie);

    const regexp = new RegExp(`^\{([^}]+)\}_${scheme}_${lang}.html$`);
    const path = req.url.match(/^([^?]+)/)?.[1];

    let appHtml = Object.entries(prerenders).find(([key]) => {
      const patternCode = key.match(regexp)?.[1];
      
      if (!patternCode) {
        return;
      }

      const pattern = Buffer.from(patternCode, 'base64').toString();

      if (matchUrl(pattern, path)) {
        return true;
      }
    })?.[1] || indexHTML.toString();

    // Выставляем тему
    appHtml = applyTheme(appHtml, theme);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.write(appHtml);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
  }

  res.endResponse();
});
