import type { FoldersEntity } from '@database/types';

export type FoldersState = FoldersEntity & {
  hasError: boolean;
  activeFolder: string;
};
