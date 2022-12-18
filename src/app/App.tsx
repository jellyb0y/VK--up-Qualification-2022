import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Router } from './Router';

import type { FC } from 'react';
import type * as T from './types';

import '@assets/styles/common.scss';
import '@assets/styles/variables.scss';

const App: FC<T.AppProps> = ({
  store,
}) => (
  <>
    {/* Возникает ошибка при использовании 18 ноды */}
    {/* @ts-ignore */}
    <Helmet>
      <title>Mail.ru - Почта</title>

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />

      <meta name="keywords" content="почта, mail.ru" />
      <meta name="description" content="Письма, рассылки" />
    </Helmet>
    <Provider store={store}>
      <Router />
    </Provider>
  </>
);

export default App;
