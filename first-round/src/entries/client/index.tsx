import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '@app';
import { ThemeProvider } from '@lib/Themes/ThemeProvider';
import { PreparerProvider } from '@lib/DataPreparer/PreparerProvider';

import DOMReady from '@utils/DOMReady';
import { IS_PRODUCTION, PRELOADED_STATE_KEY } from '@constants';
import { createStore } from '@data/store';
import { initStore } from '@data/store/initStore';
import { getSelectedTheme } from '@lib/Themes/getSelectedTheme';

DOMReady.then(async () => {
  const preloadedState = window[PRELOADED_STATE_KEY] || await initStore();
  delete window[PRELOADED_STATE_KEY];

  const store = createStore(preloadedState);
  const rootElement = document.getElementById('root');
  const theme = getSelectedTheme();

  const app = (
    <BrowserRouter>
      <PreparerProvider store={store}>
        <ThemeProvider theme={theme}>
          <App store={store} />
        </ThemeProvider>
      </PreparerProvider>
    </BrowserRouter>
  );

  if (!IS_PRODUCTION) {
    render(app, rootElement);
  } else {
    hydrate(app, rootElement);
  }
});
