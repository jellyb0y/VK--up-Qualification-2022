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

import {
  ROOT_PATH,
} from '@constants';

import { Themes } from '@lib/Themes/types';

const stylesLookup = discoverProjectStyles(ROOT_PATH);

export const renderer = async (url: string, theme: Themes): Promise<string> => {
  try {
    await stylesLookup;

    const state = initStore();
    const store = createStore(state);

    const helmet = Helmet.renderStatic();
    const appHTML = renderToString(
      <StaticRouter location={url}>
        <PreparerProvider store={store}>
          <ThemeProvider theme={theme}>
            <App store={store} />
          </ThemeProvider>
        </PreparerProvider>
      </StaticRouter>
    );

    const preloadedState = store.getState();
    const criticalStyles = getCriticalStyles(appHTML, stylesLookup)
      .replace('data-used-styles="index.css"', '');

    return templator(
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
  } catch (error) {
    console.error(error);
    return null;
  }
};
