import { Controller } from '@utils/abortController';
import { request } from '@utils/request';

import { BACKEND_BASE_URL } from '@constants';

import type { Letter } from '@database/types';

const API_URL = `${BACKEND_BASE_URL}/getLetterDoc`;

export type GetLetterDocResponse = {
  doc: Letter['doc'];
};

const controller = new Controller();

export const getLetterDoc = async (id: string): Promise<GetLetterDocResponse> => {
  const signal = controller.instance();

  return request(API_URL, {
    signal,
    params: {
      id,
    },
  });
};
