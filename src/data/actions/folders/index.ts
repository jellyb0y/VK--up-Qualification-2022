import type {
  SetFolderAction,
  SetFoldersErrorAction,
  UpdateFoldersAction,
} from './types';

import { SET_FOLDER, SET_FOLDERS_ERROR, UPDATE_FOLDERS } from './actions';

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
