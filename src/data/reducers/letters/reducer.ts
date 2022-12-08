import { UPDATE_LETTERS } from '../../actions/letters/actions';

import type { ActionTypes } from '@root/data/actions/letters/types';
import type { LettersState } from './types';

export const getInitialState = (): LettersState => ({
  entities: {},
  ids: [],
});

export const letters = (state = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_LETTERS:
      return {
        ...state,
        ...action.letters,
      };

    default:
      return state;
  }
};
