import type { Letter, UsersEntity } from '@database/types';

export interface LetterProps {
  hasError: boolean;
  isLoading: boolean;
  letter: Letter;
  users: UsersEntity['entities'];
}
