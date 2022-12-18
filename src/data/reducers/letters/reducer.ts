import { SET_LETTER, SET_LETTER_ERROR, SET_LETTER_LOADING, UPDATE_LETTERS, UPDATE_LETTER_DATA } from '../../actions/letters/actions';

import type { ActionTypes } from '@root/data/actions/letters/types';
import type { LettersState } from './types';

export const getInitialState = (): LettersState => ({
  isLoading: false,
  hasError: false,
  activeLetter: null,
  entities: {},
  ids: [],
});

export const letters = (state = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case SET_LETTER:
      return {
        ...state,
        isLoading: false,
        hasError: action.letterId === state.activeLetter && state.hasError,
        activeLetter: action.letterId,
      };
    
    case SET_LETTER_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case UPDATE_LETTERS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.letters.entities,
        },
        ids: Array.from(new Set([
          ...state.ids,
          ...action.letters.ids,
        ])),
      };

    case SET_LETTER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_LETTER_DATA:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.letter.id]: { ...action.letter },
        },
        ids: Array.from(new Set([
          ...state.ids,
          action.letter.id,
        ])),
      };

    default:
      return state;
  }
};
