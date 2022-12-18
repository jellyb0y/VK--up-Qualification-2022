import type { ShortLetter, UsersEntity } from '@database/types';

export interface FoldersProps {
  activeFolder: string;
  letters: ShortLetter[];
  users: UsersEntity['entities'];
}
