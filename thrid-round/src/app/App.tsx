import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Router } from './Router';

import { useLanguages } from '@lib/Languages/useLanguages';

import type { FC } from 'react';
import type * as T from './types';

import '@assets/styles/common.scss';
import '@assets/styles/variables.scss';

const App: FC<T.AppProps> = ({
  store,
}) => {
  const applyLanguage = useLanguages();

  return (
    <>
      {/* Возникает ошибка при использовании 18 ноды */}
      {/* @ts-ignore */}
      <Helmet>
        <title>{applyLanguage(['Mail.ru - Почта', 'Mail.ru'])}</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta name="keywords" content={applyLanguage(['почта, mail.ru', 'mail, mail.ru'])} />
        <meta name="description" content={applyLanguage(['Письма, рассылки', 'Emails, mailing'])} />
      </Helmet>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
};

export default App;
