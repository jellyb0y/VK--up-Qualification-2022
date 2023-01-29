import type { Letter, ShortLetter, UsersEntity } from '@database/types';

export interface LetterProps {
  hasError: boolean;
  isLoading: boolean;
  letter: Letter | ShortLetter;
  users: UsersEntity['entities'];
}
