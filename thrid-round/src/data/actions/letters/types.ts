import type { Letter, UnionLettersEntity } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateLettersAction extends BaseAction<'@letters/UPDATE_LETTERS'> {
  letters: UnionLettersEntity;
}

export interface UpdateLetterDataAction extends BaseAction<'@letters/UPDATE_LETTER_DATA'> {
  letter: Letter;
};

export interface SetLetterAction extends BaseAction<'@letters/SET_LETTER'> {
  letterId: string;
};

export interface SetLetterDocAction extends BaseAction<'@letters/SET_LETTER_DOC'> {
  letterId: string;
  doc: Letter['doc'];
};

export type SetLetterErrorAction = BaseAction<'@letters/SET_LETTER_ERROR'>;

export type SetLetterLoadingAction = BaseAction<'@letters/SET_LETTER_LOADING'>;

export type SetLetterLoadedAction = BaseAction<'@letters/SET_LETTER_LOADED'>;

export type SetLetterSendingAction = BaseAction<'@letters/SET_LETTER_SENDING'>;

export type SetLetterSentAction = BaseAction<'@letters/SET_LETTER_SENT'>;

export type SetSendingErrorAction = BaseAction<'@letters/SET_SENDING_ERROR'>;

export type ClearSendingFormAction = BaseAction<'@letters/CLEAR_SENDING_FORM'>;

export type ActionTypes =
  | UpdateLettersAction
  | UpdateLetterDataAction
  | SetLetterAction
  | SetLetterErrorAction
  | SetLetterLoadingAction
  | SetLetterLoadedAction
  | SetLetterDocAction
  | SetLetterSendingAction
  | SetLetterSentAction
  | SetSendingErrorAction
  | ClearSendingFormAction;
