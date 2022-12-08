import type { FoldersEntity } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateFoldersAction extends BaseAction<'UPDATE_FOLDERS'> {
  folders: FoldersEntity;
}

export type ActionTypes =
  | UpdateFoldersAction;
