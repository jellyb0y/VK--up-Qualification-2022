import { PreparerParams, Side } from './types';
import type { Preparer, PreparerFunc } from './types';

let idCounter = 0;

const uniqueId = () => idCounter++;

export const createPreparer = <P>(func: PreparerFunc<P>, params: PreparerParams): Preparer<P> => ({
  id: uniqueId(),
  preparer: func,
  prevDepsState: null,
  ...params,
});
