import type { AnyAction, Dispatch, Store } from '@reduxjs/toolkit';

export interface StoreWrapperProps {
  store: Store;
}

export interface WithDataPreparerParams<P> {
  onPrepare: (dispatch: Dispatch, props: P) => void;
}

export type Context = {
  dispatch: Dispatch;
};
