import axios from 'axios';

import { BACKEND_BASE_URL } from '@constants';

import type { WysiwygData } from '@components/Wysiwyg/utils/transformToData';

const API_URL = `${BACKEND_BASE_URL}/sendLetter`;

export interface SendLetterParams {
  to: string[];
  subj: string;
  data: WysiwygData;
};

const CancelToken = axios.CancelToken;

const makeInstance = (function () {
  if (this.source) {
    this.source.cancel();
  }

  this.source = CancelToken.source();
  return this.source;
}).bind({});

export const sendLetter = async (data: SendLetterParams): Promise<void> => {
  const instance = makeInstance();

  return axios.post(API_URL, {
    cancelToken: instance.token,
    data,
  });
};
