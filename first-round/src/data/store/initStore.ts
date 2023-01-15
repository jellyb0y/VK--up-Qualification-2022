import { getInitialState as getInitialLettersState } from '@data/reducers/letters';
import { getInitialState as getInitialFoldersState } from '@data/reducers/folders';
import { getInitialState as getInitialUsersState } from '@data/reducers/users';
import { getInitialState as getInitialFiltersState } from '@data/reducers/filters';

import type { UsersState } from '@data/reducers/users';
import type { LettersState } from '@data/reducers/letters';
import type { FoldersState } from '@data/reducers/folders';
import type { State } from '../types';
import type { FiltersState } from '@data/reducers/filters';

export const initStore = (): State => {
  const letters: LettersState = getInitialLettersState();
  const folders: FoldersState = getInitialFoldersState();
  const users: UsersState = getInitialUsersState();
  const filters: FiltersState = getInitialFiltersState();

  return {
    letters,
    folders,
    users,
    filters,
  };
};
