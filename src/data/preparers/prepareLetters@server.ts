import { useParams } from 'react-router';

import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';

import { setFolderAction } from '@data/actions/folders';
import { getLettersByFolder } from '@root/api/selectors/getLettersByPage';
import { updateLettersAction } from '@data/actions/letters';
import { updateUsersAction } from '@data/actions/users';

const DEFAULT_FOLDER = 'incomings';

export const prepareLettersServer = createPreparer((dispatch) => {
  const { folder = DEFAULT_FOLDER } = useParams<{ folder: string }>();  
  const { letters, users } = getLettersByFolder(folder);

  dispatch(setFolderAction(folder));
  dispatch(updateLettersAction(letters));
  dispatch(updateUsersAction(users));
}, {
  side: Side.Server,
});
