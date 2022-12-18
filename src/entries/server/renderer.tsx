import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { discoverProjectStyles, getCriticalStyles } from 'used-styles';
import { Helmet } from 'react-helmet';

import App from '@app';
import { PreparerProvider } from '@lib/DataPreparer/PreparerProvider';
import { ThemeProvider } from '@lib/Themes/ThemeProvider';

import { templator } from './html';
import { createStore } from '@data/store';
import { initStore } from '@data/store/initStore';
import { getSelectedTheme } from '@lib/Themes/getSelectedTheme';

import {
  ROOT_PATH,
} from '@constants';

import type { Request, Response } from 'express';

const stylesLookup = discoverProjectStyles(ROOT_PATH);

export const renderer = async (req: Request, res: Response) => {
  try {
    await stylesLookup;

    const state = await initStore();
    const store = createStore(state);

    const helmet = Helmet.renderStatic();
    const theme = getSelectedTheme(req.headers.cookie);
    const appHTML = renderToString(
      <StaticRouter location={req.url}>
        <PreparerProvider store={store}>
          <ThemeProvider cookie={req.headers.cookie}>
            <App store={store} />
          </ThemeProvider>
        </PreparerProvider>
      </StaticRouter>
    );

    const preloadedState = store.getState();
    const criticalStyles = getCriticalStyles(appHTML, stylesLookup)
      .replace('data-used-styles="index.css"', '');

    const indexHTML = await templator(
      appHTML,
      preloadedState,
      [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
        criticalStyles,
      ],
      theme,
    );

    res.contentType('text/html');
    res.status(200);

    return res.send(indexHTML); 
  } catch (error) {
    console.error(error);
  }
};
