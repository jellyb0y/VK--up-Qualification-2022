import axios from 'axios';

import { BACKEND_BASE_URL } from '@constants';

import type { Letter, UsersEntity } from '@database/types';

const API_URL = `${BACKEND_BASE_URL}/getLetter`;

export type GetLetterResponse = {
  letter: Letter;
  users: UsersEntity;
};

const CancelToken = axios.CancelToken;

const makeInstance = (function () {
  if (this.source) {
    this.source.cancel();
  }

  this.source = CancelToken.source();
  return this.source;
}).bind({});

export const getLetter = async (id: string): Promise<GetLetterResponse> => {
  const instance = makeInstance();

  return axios.get(API_URL, {
    cancelToken: instance.token,
    params: {
      id,
    },
  }).then(({ data }) => data);
};
