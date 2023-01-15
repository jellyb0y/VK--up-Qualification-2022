import { useParams } from 'react-router';

import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';

import { getLettersResolver } from '@data/resolvers/letters/getLettersResolver';

const DEFAULT_FOLDER = 'incomings';

export const prepareLettersClient = createPreparer(async (dispatch, getState) => {
  const { folder = DEFAULT_FOLDER } = useParams<{ folder: string }>();
  const { folders: { activeFolder } } = getState();

  if (activeFolder === folder) {
    return;
  }

  dispatch(getLettersResolver(folder, !!activeFolder));
}, {
  side: Side.Client,
  every: true,
});
