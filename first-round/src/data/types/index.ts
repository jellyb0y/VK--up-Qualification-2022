import type { FiltersState } from '@data/reducers/filters';
import type { FoldersState } from '@data/reducers/folders';
import type { LettersState } from '@data/reducers/letters';
import type { UsersState } from '@data/reducers/users';

export interface State {
  letters: LettersState;
  folders: FoldersState;
  users: UsersState;
  filters: FiltersState;
}
