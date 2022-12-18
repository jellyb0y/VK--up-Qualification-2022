import type { State } from '@data/types';
import type { ActionCreator, Dispatch, Store } from '@reduxjs/toolkit';
import type { ThunkActionDispatch } from 'redux-thunk';

export interface PreparerProviderProps {
  store: Store;
}

export enum Side {
  Server = 'server',
  Client = 'client',
}

export type PreparerFunc<P> = (
  dispatch: ThunkActionDispatch<ActionCreator<any>>,
  getState: () => State,
  props: P
) => Promise<void> | void;

export type Preparer<P = {}> = {
  id: number;
  preparer: PreparerFunc<P>;
  side?: Side;
  every?: boolean;
};

export type PreparerParams = {
  side?: Side;
  every?: boolean;
};

export type Context = {
  usedPreparers: Record<string, boolean>;
  dispatch: Dispatch;
  getState: () => State;
};
