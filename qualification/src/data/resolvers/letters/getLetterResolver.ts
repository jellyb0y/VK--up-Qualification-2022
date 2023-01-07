import { setLetterAction, setLetterErrorAction, setLetterLoadingAction, updateLetterDataAction } from '@data/actions/letters';
import { updateUsersAction } from '@data/actions/users';
import { getLetter } from '@data/resourses/letters/getLetter';

import type { Dispatch } from '@reduxjs/toolkit';

export const getLetterResolver = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setLetterLoadingAction());
    
    getLetter(id)
      .then(({ users, letter }) => {
        dispatch(updateUsersAction(users));
        dispatch(updateLetterDataAction(letter));
        dispatch(setLetterAction(id));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setLetterErrorAction());
      });
  };
};
