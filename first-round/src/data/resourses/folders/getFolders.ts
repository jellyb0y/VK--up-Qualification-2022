import axios from 'axios';

import { BACKEND_BASE_URL } from '@constants';

import type { FoldersEntity } from '@database/types';

const API_URL = `${BACKEND_BASE_URL}/getFolders`;

const CancelToken = axios.CancelToken;

const makeInstance = (function () {
  if (this.source) {
    this.source.cancel();
  }

  this.source = CancelToken.source();
  return this.source;
}).bind({});

export const getFolders = async (): Promise<FoldersEntity> => {
  const instance = makeInstance();

  return axios.get(API_URL, {
    cancelToken: instance.token,
  }).then(({ data }) => data);
};
