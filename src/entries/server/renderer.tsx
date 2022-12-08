import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { discoverProjectStyles, getCriticalStyles } from 'used-styles';
import { Helmet } from 'react-helmet';

import App from '@app';
import { StoreWrapper } from '@lib/DataPreparer/StoreWrapper';

import { templator } from './html';
import { createStore } from '@data/store';
import { initStore } from '@data/store/initStore';

import {
  ROOT_PATH,
} from '@constants';

import type { Request, Response } from 'express';

const stylesLookup = discoverProjectStyles(ROOT_PATH);

export const renderer = async (req: Request, res: Response) => {
  await stylesLookup;

  const state = await initStore();
  const store = createStore(state);

  const helmet = Helmet.renderStatic();
  const appHTML = renderToString(
    <StaticRouter location={req.url}>
      <StoreWrapper store={store}>
        <App store={store} />
      </StoreWrapper>
    </StaticRouter>
  );

  console.log('state', store.getState());

  const preloadedState = store.getState();
  const criticalStyles = getCriticalStyles(appHTML, stylesLookup)
    .replace('data-used-styles="index.css"', '');

  const indexHTML = await templator(appHTML, preloadedState, [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
    criticalStyles,
  ]);

  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
};
