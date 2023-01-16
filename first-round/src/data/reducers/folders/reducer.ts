import { SET_FOLDER, SET_FOLDERS_ERROR, SET_FOLDERS_LOADING, UPDATE_FOLDERS } from '../../actions/folders/actions';

import type { ActionTypes } from '@root/data/actions/folders/types';
import type { FoldersState } from './types';

export const getInitialState = (): FoldersState => ({
  isLoading: true,
  hasError: false,
  activeFolder: null,
  entities: {},
  ids: [],
});

export const folders = (state = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_FOLDERS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.folders.entities,
        },
        ids: Array.from(new Set([
          ...state.ids,
          ...action.folders.ids,
        ])),
      };
    
    case SET_FOLDER:
      return {
        ...state,
        isLoading: false,
        hasError: action.folder === state.activeFolder && state.hasError,
        activeFolder: action.folder,
      };

    case SET_FOLDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case SET_FOLDERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
