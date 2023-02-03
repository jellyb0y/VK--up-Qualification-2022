import { setLetterSendingAction, setLetterSentAction, setSendingErrorAction } from '@data/actions/letters';
import { sendLetter } from '@data/resourses/letters/sendLetter';
import { getLettersResolver } from './getLettersResolver';

import type { SendLetterParams } from '@data/resourses/letters/sendLetter';
import type { ThunkDispatch } from '@data/types/actions';

const SENT_LETTERS_FOLDER = 'sent';

export const sendLetterResolver = (params: SendLetterParams) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setLetterSendingAction());

    sendLetter(params)
      .then(() => {
        dispatch(setLetterSentAction());

        // Обновляем список отправленных писем 
        dispatch(getLettersResolver(SENT_LETTERS_FOLDER, false));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setSendingErrorAction());
      });
  };
};
