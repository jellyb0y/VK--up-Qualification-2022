import { STATIC_ROUTE, API_ROUTE, ROOT_PATH } from '@app/routes';

import { staticRouter } from './static';
import { rendererRouter } from './renderer';
import { apiRouter } from '@root/api';

import Server from '@lib/Server';

import {
  SERVER_PORT,
  DB_FILE_PATH,
} from '@constants';
import Database from '@database';

const server = new Server();

Database.init(DB_FILE_PATH)
  .then(() => {
    server.onError((error: Error) => console.error('[ERROR]:', error));

    server.connectRouter(STATIC_ROUTE, staticRouter);

    server.connectRouter(API_ROUTE, apiRouter);

    server.connectRouter(ROOT_PATH, rendererRouter);

    server.listen(SERVER_PORT);
    console.log(`Server is listening on port: ${SERVER_PORT}`);
  });
