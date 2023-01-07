import express from 'express';

import { STATIC_ROUTE } from '@app/routes';

import { staticRouter } from './static';
import { renderer } from './renderer';
import { apiRouter } from '@root/api';

import {
  SERVER_PORT,
  DB_FILE_PATH,
} from '@constants';
import Database from '@database';

const expressApp = express();

Database.init(DB_FILE_PATH)
  .then(() => {
    expressApp.use(STATIC_ROUTE, staticRouter);

    expressApp.use('/api', apiRouter);

    expressApp.get(`*`, renderer);

    expressApp.listen(SERVER_PORT, () => {
      console.log(`Server is listening on port: ${SERVER_PORT}`);
    });
  });
