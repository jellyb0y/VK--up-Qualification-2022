import { mergeLetterEntities } from './mergeLetterEntities';

import {
  CLEAR_SENDING_FORM,
  SET_LETTER,
  SET_LETTER_DOC,
  SET_LETTER_ERROR,
  SET_LETTER_LOADED,
  SET_LETTER_LOADING,
  SET_LETTER_SENDING,
  SET_LETTER_SENT,
  SET_SENDING_ERROR,
  UPDATE_LETTERS,
  UPDATE_LETTER_DATA,
} from '../../actions/letters/actions';

import type { ActionTypes } from '@root/data/actions/letters/types';
import type { LettersState } from './types';

export const getInitialState = (): LettersState => ({
  isLetterSending: false,
  hasSendingError: false,
  hasLetterSent: false,
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
        entities: mergeLetterEntities(state.entities, action.letters.entities),
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
    
    case SET_LETTER_LOADED:
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };

    case SET_LETTER_DOC:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.letterId]: {
            ...state.entities[action.letterId],
            doc: action.doc,
          },
        },
      };

    case UPDATE_LETTER_DATA:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.letter.id]: {
            ...state.entities[action.letter.id],
            ...action.letter,
          },
        },
        ids: Array.from(new Set([
          ...state.ids,
          action.letter.id,
        ])),
      };

    case SET_LETTER_SENDING:
      return {
        ...state,
        isLetterSending: true,
        hasSendingError: false,
        hasLetterSent: false,
      };

    case SET_SENDING_ERROR:
      return {
        ...state,
        isLetterSending: false,
        hasSendingError: true,
        hasLetterSent: false,
      };

    case SET_LETTER_SENT:
      return {
        ...state,
        isLetterSending: false,
        hasSendingError: false,
        hasLetterSent: true,
      };

    case CLEAR_SENDING_FORM:
      return {
        ...state,
        isLetterSending: false,
        hasSendingError: false,
        hasLetterSent: false,
      };

    default:
      return state;
  }
};
