import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';
import { selectFolderAction } from '@data/actions/folders';
import { useParams } from 'react-router';
import { resetFiltersAction } from '@data/actions/filters';

const DEFAULT_FOLDER = 'incomings';

export const prepareFolderChange = createPreparer((dispatch, getState) => {
  const { folders: { selectedFolder } } = getState();
  const { folder = DEFAULT_FOLDER } = useParams<{ folder: string }>();

  if (selectedFolder === folder) {
    return;
  }

  dispatch(selectFolderAction(folder));

  if (selectedFolder) {
    dispatch(resetFiltersAction());
  }
}, {
  side: Side.Client,
  every: true,
});
