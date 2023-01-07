import express from 'express';

import {
  ROOT_PATH,
} from '@constants';

export const staticRouter = express.Router();
staticRouter.get('*', express.static(ROOT_PATH));
