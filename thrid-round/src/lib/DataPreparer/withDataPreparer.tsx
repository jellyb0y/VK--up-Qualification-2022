import { useContext } from 'react';
import { Context } from './context';

import { PreparerDepsStates, Side } from './types';
import { IS_SERVER } from '@utils/isServer';

import type { FC } from 'react';
import type { Preparer } from './types';
import { deepEqual } from '@utils/deepEqual';
import { useSelector } from 'react-redux';
import { State } from '@data/types';

export const withDataPreparer = <P extends {}>(
  Component: FC<P>,
  preparers: Preparer<P>[],
): FC<P> => {
  const filteredPreparers = preparers.filter(Boolean);

  const depsSelector = (state: State) => filteredPreparers
    .reduce((acc, { id, dependsOn }) => {
      if (dependsOn) {
        acc[id] = dependsOn(state);
      }

      return acc;
    }, {} as PreparerDepsStates);

  return (props: P) => {
    const depsState = useSelector(depsSelector);
    const context = useContext(Context);

    filteredPreparers.forEach((preparerConfig) => {
      const {
        id,
        side,
        every,
        prevDepsState,
        preparer,
      } = preparerConfig;

      const isAvailable = (
        !IS_SERVER && side === Side.Client ||
        IS_SERVER && side === Side.Server
      );

      const currentDepsState = depsState[id] || null;

      const isPreparerNeedToBeRun = (context && isAvailable && (
        every ||
        !context.usedPreparers[id] ||
        !deepEqual(currentDepsState, prevDepsState)
      ));

      if (isPreparerNeedToBeRun) {
        preparerConfig.prevDepsState = currentDepsState;
        context.usedPreparers[id] = true;
        preparer(context.dispatch, context.getState, props);
      }
    });

    return <Component {...props} />;
  };
};
