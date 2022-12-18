import { useContext } from 'react';
import { Context } from './context';

import { Side } from './types';
import { IS_SERVER } from '@utils/isServer';

import type { FC } from 'react';
import type { Preparer } from './types';

export const withDataPreparer = <P extends {}>(
  Component: FC<P>,
  preparers: Preparer<P>[],
): FC<P> => {
  return (props: P) => {
    const context = useContext(Context);

    preparers.forEach(({ id, side, every, preparer }) => {
      const isAvailable = (
        !IS_SERVER && side === Side.Client ||
        IS_SERVER && side === Side.Server
      );

      if (context && isAvailable && (!context.usedPreparers[id] || every)) {
        context.usedPreparers[id] = true;
        preparer(context.dispatch, context.getState, props);
      }
    });

    return (
      <Component {...props} />
    );
  };
};
