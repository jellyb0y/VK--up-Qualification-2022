import { Context } from './context';

import type { FC } from 'react';
import type { PreparerProviderProps } from './types';

export const PreparerProvider: FC<PreparerProviderProps> = ({ store, children }) => {
  const context = {
    usedPreparers: {},
    dispatch: store.dispatch,
    getState: store.getState,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};
