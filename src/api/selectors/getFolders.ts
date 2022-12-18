import Database from '@database';
import type { FoldersEntity } from '@database/types';

export const getFolders = (): FoldersEntity => Database.data.folders;
