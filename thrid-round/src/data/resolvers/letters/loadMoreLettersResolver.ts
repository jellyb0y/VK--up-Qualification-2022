import { setLetterLoadingAction, updateLettersAction } from '@data/actions/letters';
import { updateUsersAction } from '@data/actions/users';
import { getLetters } from '@data/resourses/letters/getLetters';
import { setFolderLettersAction, setFolderLettersCountAction } from '@data/actions/folders';

import type { Dispatch } from '@reduxjs/toolkit';
import type { State } from '@data/types';

export const loadMoreLettersResolver = (loadIndex: number) => {
  return (dispatch: Dispatch, getState: () => State) => {
    const {
      filters,
      folders: {
        entities,
        activeFolder,
      }
    } = getState();

    const {
      id: folder,
      letters: currentLetters,
    } = entities[activeFolder];

    const indexFrom = currentLetters.length;
    const indexTo = loadIndex;

    if (indexTo < indexFrom) {
      return;
    }

    getLetters(folder, filters, indexFrom, indexTo)
      .then(({ users, letters, totalLetters }) => {
        dispatch(setFolderLettersCountAction(folder, totalLetters));
        dispatch(updateUsersAction(users));
        dispatch(updateLettersAction(letters));
        dispatch(setFolderLettersAction(folder, [
          ...currentLetters,
          ...letters.ids
        ]));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
