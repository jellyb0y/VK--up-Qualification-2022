import type { Letter, UsersEntity } from '@database/types';

export interface LetterProps {
  letter: Letter;
  users: UsersEntity['entities'];
  loadDoc: (id: string) => void;
}
