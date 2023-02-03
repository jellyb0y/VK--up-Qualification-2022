import { updateLettersAction } from '@data/actions/letters';
import { updateUsersAction } from '@data/actions/users';
import { getLetters } from '@data/resourses/letters/getLetters';
import {
  setFolderAction,
  setFolderLettersAction,
  setFolderLettersCountAction,
  setFoldersErrorAction,
  setFoldersLoadingAction,
} from '@data/actions/folders';

import type { Dispatch } from '@reduxjs/toolkit';
import type { State } from '@data/types';

export const getLettersResolver = (folder: string, setActiveLetter = true) => {
  return (dispatch: Dispatch, getState: () => State) => {
    const { filters } = getState();

    dispatch(setFoldersLoadingAction());

    getLetters(folder, filters)
      .then(({ users, letters, totalLetters }) => {
        dispatch(updateUsersAction(users));
        dispatch(updateLettersAction(letters));
        dispatch(setFolderLettersCountAction(folder, totalLetters));

        dispatch(setFolderLettersAction(folder, letters.ids));
        
        if (setActiveLetter) {
          dispatch(setFolderAction(folder));
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(setFoldersErrorAction());
      });
  };
};
