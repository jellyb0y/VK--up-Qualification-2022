import { moveLetter } from '@data/resourses/letters/moveLetter';
import { getLettersResolver } from './getLettersResolver';

import type { ThunkDispatch } from '@data/types/actions';
import type { State } from '@data/types';

export const moverLetterResolver = (folder: string, letterId: string) => {
  return (dispatch: ThunkDispatch, getState: () => State) => {
    const {
      letters: { entities },
    } = getState();

    const letter = entities[letterId];

    if (!letter) {
      return;
    }

    const previusFolder = letter.folder;

    if (previusFolder === folder) {
      return;
    }

    moveLetter(folder, letterId)
      .then(() => {
        // Обновляем список писем 
        dispatch(getLettersResolver(folder, false));
        dispatch(getLettersResolver(previusFolder, false));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
