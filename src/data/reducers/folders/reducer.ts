import { UPDATE_FOLDERS } from '../../actions/folders/actions';

import type { ActionTypes } from '@root/data/actions/folders/types';
import type { FoldersState } from './types';

export const getInitialState = (): FoldersState => ({
  entities: {},
  ids: [],
});

export const folders = (state = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_FOLDERS:
      return {
        ...state,
        ...action.folders,
      };

    default:
      return state;
  }
};
