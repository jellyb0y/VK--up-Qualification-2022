import type { ActionCreator } from 'redux';
import type { ThunkActionDispatch } from 'redux-thunk';

export interface BaseAction<T> {
  type: T;
}

export type ThunkDispatch = ThunkActionDispatch<ActionCreator<any>>;
