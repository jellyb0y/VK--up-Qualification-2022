import type {
  UpdateLettersAction,
} from './types';

import { UPDATE_LETTERS } from './actions';

import type { LettersEntity } from '@database/types';

export const updateLettersAction = (letters: LettersEntity): UpdateLettersAction => ({
  type: UPDATE_LETTERS,
  letters,
});
