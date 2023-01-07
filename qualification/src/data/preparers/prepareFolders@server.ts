import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { getFolders } from '@api/selectors/getFolders';
import { updateFoldersAction } from '@data/actions/folders';
import { Side } from '@lib/DataPreparer/types';

export const prepareFoldersServer = createPreparer((dispatch) => {
  const folders = getFolders();
  dispatch(updateFoldersAction(folders));
}, {
  side: Side.Server,
});
