import { setLetterSendingAction, setLetterSentAction, setSendingErrorAction } from '@data/actions/letters';
import { sendLetter } from '@data/resourses/letters/sendLetter';

import type { ActionCreator } from '@reduxjs/toolkit';
import type { SendLetterParams } from '@data/resourses/letters/sendLetter';
import type { ThunkActionDispatch } from 'redux-thunk';
import { getLettersResolver } from './getLettersResolver';

const SENT_LETTERS_FOLDER = 'sent';

export const sendLetterResolver = (params: SendLetterParams) => {
  return (dispatch: ThunkActionDispatch<ActionCreator<any>>) => {
    dispatch(setLetterSendingAction());

    sendLetter(params)
      .then(() => {
        dispatch(setLetterSentAction());

        // Обновляем список отправленных писем 
        dispatch(getLettersResolver(SENT_LETTERS_FOLDER));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setSendingErrorAction());
      });
  };
};
