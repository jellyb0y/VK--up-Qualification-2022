import { Controller } from '@utils/abortController';
import { request } from '@utils/request';

import { BACKEND_BASE_URL } from '@constants';

import type { FoldersEntity } from '@database/types';

const API_URL = `${BACKEND_BASE_URL}/getFolders`;

const controller = new Controller();

export const getFolders = async (): Promise<FoldersEntity> => {
  const signal = controller.instance();

  return request(API_URL, { signal });
};
