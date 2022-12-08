import type { LettersEntity } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateLettersAction extends BaseAction<'UPDATE_LETTERS'> {
  letters: LettersEntity;
}

export type ActionTypes =
  | UpdateLettersAction;
