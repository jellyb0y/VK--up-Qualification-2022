import { resolve } from 'path';

export const ROOT_PATH = resolve(__dirname, './');

export const IS_PRODUCTION = process.env.isProduction;

export const SERVER_PORT = 3000;
export const INDEX_PATH = `${ROOT_PATH}/index.html`;

export const DB_FILE_PATH = `${ROOT_PATH}/db.json`;

export const PRELOADED_STATE_KEY = '__PRELOADED_STATE__';

export const BACKEND_BASE_URL = '/api';
