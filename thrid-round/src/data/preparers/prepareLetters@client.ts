import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';

import { getLettersResolver } from '@data/resolvers/letters/getLettersResolver';

export const prepareLettersClient = createPreparer((dispatch, getState) => {
  const { folders: { selectedFolder } } = getState();
  dispatch(getLettersResolver(selectedFolder));
}, {
  side: Side.Client,
  dependsOn: ({
    filters,
    folders: { selectedFolder },
  }) => ({
    filters,
    selectedFolder,
  }),
});
