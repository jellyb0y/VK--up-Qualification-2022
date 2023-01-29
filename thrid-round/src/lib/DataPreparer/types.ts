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

export type DependsOnFunc = (state: State) => object;

export type PreparerDepsStates = Record<number, object>;

export type PreparerFunc<P> = (
  dispatch: ThunkActionDispatch<ActionCreator<any>>,
  getState: () => State,
  props: P
) => Promise<void> | void;

export type Preparer<P = {}> = {
  id: number;
  preparer: PreparerFunc<P>;
  prevDepsState: object | null;
  side?: Side;
  every?: boolean;
  dependsOn?: DependsOnFunc;
};

export type PreparerParams = {
  side?: Side;
  every?: boolean;
  dependsOn?: DependsOnFunc;
};

export type Context = {
  usedPreparers: Record<string, boolean>;
  dispatch: Dispatch;
  getState: () => State;
};
