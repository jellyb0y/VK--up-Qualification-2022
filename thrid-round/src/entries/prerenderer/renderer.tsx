import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { discoverProjectStyles, getCriticalStyles } from 'used-styles';
import { Helmet } from 'react-helmet';

import App from '@app';
import { PreparerProvider } from '@lib/DataPreparer/PreparerProvider';
import { ThemeProvider } from '@lib/Themes/ThemeProvider';
import { LanguagesProvider } from '@lib/Languages/LanguagesProvider';

import { templator } from './html';
import { createStore } from '@data/store';
import { initStore } from '@data/store/initStore';

import {
  ROOT_PATH,
} from '@constants';

import type { Schemes } from '@lib/Themes/types';
import type { Languages } from '@lib/Languages/types';

const CSS_ASSETS = ['main.css'];

const stylesLookup = discoverProjectStyles(ROOT_PATH, (filename: string) => CSS_ASSETS.includes(filename));

export const renderer = async (url: string, scheme: Schemes, lang: Languages): Promise<string> => {
  try {
    await stylesLookup;

    const state = initStore();
    const store = createStore(state);

    const helmet = Helmet.renderStatic();
    const appHTML = renderToString(
      <StaticRouter location={url}>
        <PreparerProvider store={store}>
          <ThemeProvider scheme={scheme}>
            <LanguagesProvider lang={lang}>
              <App store={store} />
            </LanguagesProvider>
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
      scheme,
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
