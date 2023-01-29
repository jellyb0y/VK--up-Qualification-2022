import axios from 'axios';

import { BACKEND_BASE_URL } from '@constants';

import type { LettersEntity, UsersEntity } from '@database/types';
import type { FiltersState } from '@data/reducers/filters';

const API_URL = `${BACKEND_BASE_URL}/getLetters`;

export type GetLettersResponse = {
  totalLetters: number;
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

export const getLetters = async (folder: string, filters: FiltersState, from?: number, to?: number): Promise<GetLettersResponse> => {
  const instance = makeInstance();

  const filtersParams = {
    sortType: filters.sortType,
    bookmarkFilter: filters.bookmarkFilter ? 1 : 0,
    attachmentsFilter: filters.attachmentsFilter ? 1 : 0,
    readFilter: filters.readFilter ? 1 : 0,
  };

  return axios.get(API_URL, {
    cancelToken: instance.token,
    params: {
      folder,
      from,
      to,
      ...filtersParams,
    },
  }).then(({ data }) => data);
};
