import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '@themes';

import App from '@app';
import { ThemeProvider } from '@lib/Themes/ThemeProvider';
import { PreparerProvider } from '@lib/DataPreparer/PreparerProvider';

import DOMReady from '@utils/DOMReady';
import { PRELOADED_STATE_KEY } from '@constants';
import { createStore } from '@data/store';
import { initStore } from '@data/store/initStore';
import { getSelectedScheme } from '@lib/Themes/getSelectedScheme';
import { getSelectedTheme } from '@lib/Themes/getSelectedTheme';
import { LanguagesProvider } from '@lib/Languages/LanguagesProvider';
import { getSelectedLang } from '@lib/Languages/getSelectedLanguage';

DOMReady.then(async () => {
  const preloadedState = window[PRELOADED_STATE_KEY] || await initStore();
  delete window[PRELOADED_STATE_KEY];

  const store = createStore(preloadedState);
  const rootElement = document.getElementById('root');

  const scheme = getSelectedScheme();
  const theme = getSelectedTheme();
  const lang = getSelectedLang();

  const app = (
    <BrowserRouter>
      <PreparerProvider store={store}>
        <ThemeProvider theme={theme} scheme={scheme}>
          <LanguagesProvider lang={lang}>
            <App store={store} />
          </LanguagesProvider>
        </ThemeProvider>
      </PreparerProvider>
    </BrowserRouter>
  );

  hydrate(app, rootElement);
});
