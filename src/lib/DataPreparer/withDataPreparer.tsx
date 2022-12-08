import { useContext } from 'react';
import { Context } from './context';

import type { FC } from 'react';
import type { WithDataPreparerParams } from './types';

export const withDataPreparer = <T extends {}>(
  Component: FC<T>,
  params: WithDataPreparerParams<T>
): FC<T> => {
  const { onPrepare } = params;

  return (props: T) => {
    const context = useContext(Context);

    if (context) {
      onPrepare(context.dispatch, props);
    }

    return (
      <Component {...props} />
    );
  };
};
