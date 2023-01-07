import { updateLettersAction } from '@data/actions/letters';
import { updateUsersAction } from '@data/actions/users';
import { getLetters } from '@data/resourses/letters/getLetters';
import { setFolderAction, setFoldersErrorAction, setFoldersLoadingAction } from '@data/actions/folders';

import type { Dispatch } from '@reduxjs/toolkit';

export const getLettersResolver = (folder: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setFoldersLoadingAction());

    getLetters(folder)
      .then(({ users, letters }) => {
        dispatch(updateUsersAction(users));
        dispatch(updateLettersAction(letters));
        dispatch(setFolderAction(folder));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setFoldersErrorAction());
      });
  };
};
