import type { FiltersState } from '@data/reducers/filters';
import type { Letter, ShortLetter } from '@database/types';

export const applyFilters = (filters: FiltersState, letters: (Letter | ShortLetter)[]): (Letter | ShortLetter)[] => {
  const {
    bookmarkFilter,
    readFilter,
    attachmentsFilter,
  } = filters;

  return letters.filter((letter) => (
    (attachmentsFilter ? letter.hasDoc : true) &&
    (readFilter ? !letter.read : true) &&
    (bookmarkFilter ? letter.bookmark : true)
  ));
};
