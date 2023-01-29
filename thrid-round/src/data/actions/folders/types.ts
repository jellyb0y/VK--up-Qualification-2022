import type { FoldersEntity, IdList } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateFoldersAction extends BaseAction<'@folders/UPDATE_FOLDERS'> {
  folders: FoldersEntity;
}

export interface SetFolderAction extends BaseAction<'@folders/SET_FOLDER'> {
  folder: string;
}

export interface SelectFolderAction extends BaseAction<'@folders/SELECT_FOLDER'> {
  folder: string;
}

export interface SetFolderLettersCountAction extends BaseAction<'@folders/SET_FOLDER_LETTERS_COUNT'> {
  folder: string;
  count: number;
}

export type SetFoldersErrorAction = BaseAction<'@folders/SET_FOLDERS_ERROR'>;

export type SetFoldersLoadingAction = BaseAction<'@folders/SET_FOLDERS_LOADING'>;

export type SetFolderLettersAction = BaseAction<'@folders/SET_FOLDER_LETTERS'> & {
  folder: string;
  letters: IdList;
};
export type ActionTypes =
  | UpdateFoldersAction
  | SetFolderAction
  | SetFoldersErrorAction
  | SetFoldersLoadingAction
  | SetFolderLettersAction
  | SelectFolderAction
  | SetFolderLettersCountAction;
