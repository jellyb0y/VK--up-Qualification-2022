import type { FoldersEntity } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateFoldersAction extends BaseAction<'UPDATE_FOLDERS'> {
  folders: FoldersEntity;
}

export interface SetFolderAction extends BaseAction<'SET_FOLDER'> {
  folder: string;
}

export type SetFoldersErrorAction = BaseAction<'SET_FOLDERS_ERROR'>;

export type ActionTypes =
  | UpdateFoldersAction
  | SetFolderAction
  | SetFoldersErrorAction;
