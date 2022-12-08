import { Context } from './context';

import type { FC } from 'react';
import type { StoreWrapperProps } from './types';

export const StoreWrapper: FC<StoreWrapperProps> = ({ store, children }) => {
  const context = {
    dispatch: store.dispatch,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};
