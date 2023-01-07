import { matchPath } from 'react-router';

import { indexHTML, prerenders  } from './prerenders';
import { getSelectedTheme } from '@lib/Themes/getSelectedTheme';

import type { Request, Response } from 'express';

export const renderer = async (req: Request, res: Response) => {
  try {
    const theme = getSelectedTheme(req.headers.cookie);
    const regexp = new RegExp(`^\{([^}]+)\}_${theme}.html$`);

    const appHtml = Object.entries(prerenders).find(([key]) => {
      const patternCode = key.match(regexp)?.[1];
      
      if (!patternCode) {
        return;
      }

      const pattern = Buffer.from(patternCode, 'base64').toString();

      if (matchPath(pattern, req.url)) {
        return true;
      }
    })?.[1] || indexHTML;

    res.contentType('text/html');
    res.status(200);

    return res.send(appHtml); 
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
