import type {
  SetFolderAction,
  SetFoldersErrorAction,
  SetFoldersLoadingAction,
  UpdateFoldersAction,
} from './types';

import { SET_FOLDER, SET_FOLDERS_ERROR, SET_FOLDERS_LOADING, UPDATE_FOLDERS } from './actions';

import type { FoldersEntity } from '@database/types';

export const updateFoldersAction = (folders: FoldersEntity): UpdateFoldersAction => ({
  type: UPDATE_FOLDERS,
  folders,
});

export const setFolderAction = (folder: string): SetFolderAction => ({
  type: SET_FOLDER,
  folder,
});

export const setFoldersErrorAction = (): SetFoldersErrorAction => ({
  type: SET_FOLDERS_ERROR,
});

export const setFoldersLoadingAction = (): SetFoldersLoadingAction => ({
  type: SET_FOLDERS_LOADING,
});
