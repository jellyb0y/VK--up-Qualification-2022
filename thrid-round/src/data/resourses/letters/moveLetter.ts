import axios from 'axios';

import { BACKEND_BASE_URL } from '@constants';

const API_URL = `${BACKEND_BASE_URL}/moveLetter`;

const CancelToken = axios.CancelToken;

const makeInstance = (function () {
  if (this.source) {
    this.source.cancel();
  }

  this.source = CancelToken.source();
  return this.source;
}).bind({});

export const moveLetter = async (folder: string, letterId: string): Promise<void> => {
  const instance = makeInstance();

  return axios.post(API_URL, {
    cancelToken: instance.token,
    data: {
      folder,
      letterId,
    },
  });
};
