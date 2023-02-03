import { Controller } from '@utils/abortController';
import { Method, request } from '@utils/request';

import { BACKEND_BASE_URL } from '@constants';

import type { WysiwygData } from '@components/Wysiwyg/utils/transformToData';

const API_URL = `${BACKEND_BASE_URL}/sendLetter`;

export interface SendLetterParams {
  to: string[];
  subj: string;
  data: WysiwygData;
};

const controller = new Controller();

export const sendLetter = async (data: SendLetterParams): Promise<void> => {
  const signal = controller.instance();

  return request(API_URL, {
    method: Method.POST,
    signal,
    body: data,
  });
};
