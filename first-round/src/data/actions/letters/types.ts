import type { Letter, UnionLettersEntity } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateLettersAction extends BaseAction<'UPDATE_LETTERS'> {
  letters: UnionLettersEntity;
}

export interface UpdateLetterDataAction extends BaseAction<'UPDATE_LETTER_DATA'> {
  letter: Letter;
};

export interface SetLetterAction extends BaseAction<'SET_LETTER'> {
  letterId: string;
};

export type SetLetterErrorAction = BaseAction<'SET_LETTER_ERROR'>;

export type SetLetterLoadingAction = BaseAction<'SET_LETTER_LOADING'>;

export type ActionTypes =
  | UpdateLettersAction
  | UpdateLetterDataAction
  | SetLetterAction
  | SetLetterErrorAction
  | SetLetterLoadingAction;
