import type { ShortLetter, User } from '@database/types';

export interface LetterShortCutProps extends ShortLetter {
  authorUser: User;
  folder: string;
}
