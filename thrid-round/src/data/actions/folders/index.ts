import type {
  SelectFolderAction,
  SetFolderAction,
  SetFolderLettersAction,
  SetFolderLettersCountAction,
  SetFoldersErrorAction,
  SetFoldersLoadingAction,
  UpdateFoldersAction,
} from './types';

import { SELECT_FOLDER, SET_FOLDER, SET_FOLDERS_ERROR, SET_FOLDERS_LOADING, SET_FOLDER_LETTERS, SET_FOLDER_LETTERS_COUNT, UPDATE_FOLDERS } from './actions';

import type { FoldersEntity, IdList } from '@database/types';

export const updateFoldersAction = (folders: FoldersEntity): UpdateFoldersAction => ({
  type: UPDATE_FOLDERS,
  folders,
});

export const setFolderAction = (folder: string): SetFolderAction => ({
  type: SET_FOLDER,
  folder,
});

export const selectFolderAction = (folder: string): SelectFolderAction => ({
  type: SELECT_FOLDER,
  folder,
});

export const setFoldersErrorAction = (): SetFoldersErrorAction => ({
  type: SET_FOLDERS_ERROR,
});

export const setFoldersLoadingAction = (): SetFoldersLoadingAction => ({
  type: SET_FOLDERS_LOADING,
});

export const setFolderLettersCountAction = (folder: string, count: number): SetFolderLettersCountAction => ({
  type: SET_FOLDER_LETTERS_COUNT,
  folder,
  count,
});

export const setFolderLettersAction = (folder: string, letters: IdList): SetFolderLettersAction => ({
  type: SET_FOLDER_LETTERS,
  folder,
  letters,
});
