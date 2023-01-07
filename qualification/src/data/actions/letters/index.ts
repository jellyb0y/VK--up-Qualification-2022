import type {
  SetLetterAction,
  SetLetterErrorAction,
  SetLetterLoadingAction,
  UpdateLetterDataAction,
  UpdateLettersAction,
} from './types';

import { SET_LETTER, SET_LETTER_ERROR, SET_LETTER_LOADING, UPDATE_LETTERS, UPDATE_LETTER_DATA } from './actions';

import type { Letter, UnionLettersEntity } from '@database/types';

export const updateLettersAction = (letters: UnionLettersEntity): UpdateLettersAction => ({
  type: UPDATE_LETTERS,
  letters,
});

export const updateLetterDataAction = (letter: Letter): UpdateLetterDataAction => ({
  type: UPDATE_LETTER_DATA,
  letter,
});

export const setLetterAction = (letterId: string): SetLetterAction => ({
  type: SET_LETTER,
  letterId,
});

export const setLetterErrorAction = (): SetLetterErrorAction => ({
  type: SET_LETTER_ERROR,
});

export const setLetterLoadingAction = (): SetLetterLoadingAction => ({
  type: SET_LETTER_LOADING,
});
