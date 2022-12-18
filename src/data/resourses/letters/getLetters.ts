import axios from 'axios';

import { BACKEND_BASE_URL } from '@constants';

import type { LettersEntity, UsersEntity } from '@database/types';

const API_URL = `${BACKEND_BASE_URL}/getLetters`;

export type GetLettersResponse = {
  letters: LettersEntity;
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

export const getLetters = async (folder: string): Promise<GetLettersResponse> => {
  const instance = makeInstance();

  return axios.get(API_URL, {
    cancelToken: instance.token,
    params: {
      folder,
    },
  }).then(({ data }) => data);
};
