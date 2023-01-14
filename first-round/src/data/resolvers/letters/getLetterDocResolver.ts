import { setLetterDocAction } from '@data/actions/letters';
import { getLetterDoc } from '@data/resourses/letters/getLetterDoc';

import type { Dispatch } from '@reduxjs/toolkit';

export const getLetterDocResolver = (id: string) => {
  return (dispatch: Dispatch) => {
    getLetterDoc(id)
      .then(({ doc }) => {
        dispatch(setLetterDocAction(id, doc));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
