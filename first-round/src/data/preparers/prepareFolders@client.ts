import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';
import { getFoldersResolver } from '@data/resolvers/folders/getFoldersResolver';

export const prepareFoldersServer = createPreparer((dispatch) => {
  dispatch(getFoldersResolver());
}, {
  side: Side.Client,
});
