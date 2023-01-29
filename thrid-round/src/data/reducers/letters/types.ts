import type { UnionLettersEntity } from '@database/types';

export type LettersState = UnionLettersEntity & {
  isLoading: boolean;
  hasError: boolean;
  activeLetter: string;
};
