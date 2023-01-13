import { indexHTML, prerenders } from './prerenders';
import { getSelectedTheme } from '@lib/Themes/getSelectedTheme';
import { matchUrl } from '@utils/matchUrl';
import Server from '@lib/Server';

export const rendererRouter = Server.route();

rendererRouter.get('*', async (req, res) => {
  try {
    const theme = getSelectedTheme(req.headers.cookie);
    const regexp = new RegExp(`^\{([^}]+)\}_${theme}.html$`);

    const appHtml = Object.entries(prerenders).find(([key]) => {
      const patternCode = key.match(regexp)?.[1];
      
      if (!patternCode) {
        return;
      }

      const pattern = Buffer.from(patternCode, 'base64').toString();

      if (matchUrl(pattern, req.url)) {
        return true;
      }
    })?.[1] || indexHTML;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.write(appHtml);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
  }

  res.endResponse();
});
