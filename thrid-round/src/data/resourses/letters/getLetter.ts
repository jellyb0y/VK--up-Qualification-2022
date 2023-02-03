import { Controller } from '@utils/abortController';
import { request } from '@utils/request';

import { BACKEND_BASE_URL } from '@constants';

import type { Letter, UsersEntity } from '@database/types';

const API_URL = `${BACKEND_BASE_URL}/getLetter`;

export type GetLetterResponse = {
  letter: Letter;
  users: UsersEntity;
};

const controller = new Controller();

export const getLetter = async (id: string): Promise<GetLetterResponse> => {
  const signal = controller.instance();

  return request(API_URL, {
    signal,
    params: {
      id,
    },
  });
};
