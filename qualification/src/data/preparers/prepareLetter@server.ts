import { useParams } from 'react-router';

import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';

import { setLetterAction, updateLetterDataAction } from '@data/actions/letters';
import { updateUsersAction } from '@data/actions/users';
import { getLetterById } from '@root/api/selectors/getLetterById';

export const prepareLetterServer = createPreparer((dispatch) => {
  const { id } = useParams<{ id: string }>();  
  const { letter, users } = getLetterById(id);

  dispatch(updateLetterDataAction(letter));
  dispatch(updateUsersAction(users));
  dispatch(setLetterAction(id));
}, {
  side: Side.Server,
});
