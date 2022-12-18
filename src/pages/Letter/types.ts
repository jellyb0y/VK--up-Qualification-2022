import type { Letter, UsersEntity } from '@database/types';

export interface LetterProps {
  isLoading: boolean;
  letter: Letter;
  users: UsersEntity['entities'];
}
