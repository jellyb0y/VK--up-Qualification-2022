import { updateLettersAction } from '@data/actions/letters';
import { updateUsersAction } from '@data/actions/users';
import { getLetters } from '@data/resourses/letters/getLetters';
import { setFolderAction, setFoldersErrorAction, setFoldersLoadingAction } from '@data/actions/folders';

import type { Dispatch } from '@reduxjs/toolkit';
import { resetFiltersAction } from '@data/actions/filters';

export const getLettersResolver = (folder: string, resetFilters = false) => {
  return (dispatch: Dispatch) => {
    dispatch(setFoldersLoadingAction());

    getLetters(folder)
      .then(({ users, letters }) => {
        dispatch(updateUsersAction(users));
        dispatch(updateLettersAction(letters));
        dispatch(setFolderAction(folder));

        if (resetFilters) {
          dispatch(resetFiltersAction());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(setFoldersErrorAction());
      });
  };
};
