import type { FoldersEntity } from '@database/types';

export type FoldersState = FoldersEntity & {
  isLoading: boolean;
  hasError: boolean;
  activeFolder: string;
};
