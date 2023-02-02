import type {
  SetLetterAction,
  SetLetterErrorAction,
  SetLetterLoadingAction,
  UpdateLetterDataAction,
  UpdateLettersAction,
  SetLetterLoadedAction,
  SetLetterDocAction,
  SetLetterSendingAction,
  SetLetterSentAction,
  SetSendingErrorAction,
  ClearSendingFormAction,
} from './types';

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
} from './actions';

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

export const setLetterLoadedAction = (): SetLetterLoadedAction => ({
  type: SET_LETTER_LOADED,
});

export const setLetterDocAction = (letterId: string, doc: Letter['doc']): SetLetterDocAction => ({
  type: SET_LETTER_DOC,
  letterId,
  doc,
});

export const setLetterSendingAction = (): SetLetterSendingAction => ({
  type: SET_LETTER_SENDING,
});

export const setLetterSentAction = (): SetLetterSentAction => ({
  type: SET_LETTER_SENT,
});

export const setSendingErrorAction = (): SetSendingErrorAction => ({
  type: SET_SENDING_ERROR,
});

export const clearSendingFormAction = (): ClearSendingFormAction => ({
  type: CLEAR_SENDING_FORM,
});
