import { Controller } from '@utils/abortController';
import { request } from '@utils/request';

import { BACKEND_BASE_URL } from '@constants';

import type { LettersEntity, UsersEntity } from '@database/types';
import type { FiltersState } from '@data/reducers/filters';

const API_URL = `${BACKEND_BASE_URL}/getLetters`;

export type GetLettersResponse = {
  totalLetters: number;
  letters: LettersEntity;
  users: UsersEntity;
};

const controller = new Controller();

export const getLetters = async (folder: string, filters: FiltersState, from?: number, to?: number): Promise<GetLettersResponse> => {
  const signal = controller.instance(folder);

  const filtersParams = {
    sortType: filters.sortType,
    bookmarkFilter: filters.bookmarkFilter ? 1 : 0,
    attachmentsFilter: filters.attachmentsFilter ? 1 : 0,
    readFilter: filters.readFilter ? 1 : 0,
  };

  const params = {
    folder,
    from,
    to,
    ...filtersParams,
  };

  return request(API_URL, {
    signal,
    params,
  });
};
