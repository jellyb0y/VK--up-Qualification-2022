import { getInitialState } from '@data/reducers/letters';

import type { LettersState } from '@data/reducers/letters';
import type { State } from '../types';

export const initStore = async (token?: string): Promise<State> => {
  const letters: LettersState = getInitialState();

  return {
    letters,
  };
};
