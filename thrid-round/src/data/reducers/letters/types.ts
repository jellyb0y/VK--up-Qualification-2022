import type { UnionLettersEntity } from '@database/types';

export type LettersState = UnionLettersEntity & {
  isLetterSending: boolean;
  hasSendingError: boolean;
  hasLetterSent: boolean;
  isLoading: boolean;
  hasError: boolean;
  activeLetter: string;
};
