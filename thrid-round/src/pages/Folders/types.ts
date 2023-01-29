import type { ShortLetter, UsersEntity } from '@database/types';

export interface FoldersProps {
  isLoading: boolean;
  hasError: boolean;
  activeFolder: string;
  letters: ShortLetter[];
  users: UsersEntity['entities'];
  totalLetters: number;
  preloadLetters: (index: number) => void;
}
