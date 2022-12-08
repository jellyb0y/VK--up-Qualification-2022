import type {
  UpdateFoldersAction,
} from './types';

import { UPDATE_FOLDERS } from './actions';

import type { FoldersEntity } from '@database/types';

export const updateFoldersAction = (folders: FoldersEntity): UpdateFoldersAction => ({
  type: UPDATE_FOLDERS,
  folders,
});
