import { SortType } from '@data/reducers/filters';
import type { Letter, ShortLetter } from '@database/types';

export const applySort = (sortType: SortType, letters: (Letter | ShortLetter)[]): (Letter | ShortLetter)[] => {
  return letters.sort(({ date: dateA }, { date: dateB }) => (
    sortType === SortType.NewestFirst
      ? new Date(dateB).getTime() - new Date(dateA).getTime()
      : new Date(dateA).getTime() - new Date(dateB).getTime()
  ));
};
