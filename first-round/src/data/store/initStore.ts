import { getInitialState as getInitialLettersState } from '@data/reducers/letters';
import { getInitialState as getInitialFoldersState } from '@data/reducers/folders';
import { getInitialState as getInitialUsersState } from '@data/reducers/users';

import type { UsersState } from '@data/reducers/users';
import type { LettersState } from '@data/reducers/letters';
import type { FoldersState } from '@data/reducers/folders';
import type { State } from '../types';

export const initStore = (): State => {
  const letters: LettersState = getInitialLettersState();
  const folders: FoldersState = getInitialFoldersState();
  const users: UsersState = getInitialUsersState();

  return {
    letters,
    folders,
    users,
  };
};
