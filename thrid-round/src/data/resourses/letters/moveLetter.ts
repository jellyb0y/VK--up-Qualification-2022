import { Controller } from '@utils/abortController';
import { Method, request } from '@utils/request';

import { BACKEND_BASE_URL } from '@constants';

const API_URL = `${BACKEND_BASE_URL}/moveLetter`;

const controller = new Controller();

export const moveLetter = async (folder: string, letterId: string): Promise<void> => {
  const signal = controller.instance(folder);

  return request(API_URL, {
    method: Method.POST,
    signal,
    body: {
      folder,
      letterId,
    },
  });
};
