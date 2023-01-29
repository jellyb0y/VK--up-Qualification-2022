import { FiltersState, SortType } from '@data/reducers/filters';
import Database from '@database';
import { normalizeShortLetter } from '@database/normalizers/normalizeShortLetter';

import type { IdList, Letter, ShortLetter } from '@database/types';

const DEFAULT_MAX_LETTERS = 30;

export const applyFilter = (
  filters: FiltersState,
  letter: Letter | ShortLetter
): boolean => {
  const {
    bookmarkFilter,
    readFilter,
    attachmentsFilter,
  } = filters;

  return (
    (attachmentsFilter ? letter.hasDoc : true) &&
    (readFilter ? !letter.read : true) &&
    (bookmarkFilter ? letter.bookmark : true)
  );
};

export const getLettersByFolder = (
  folderId: string,
  from: number = 0,
  to: number = DEFAULT_MAX_LETTERS,
  filters: FiltersState,
) => {
  const usersIds: IdList = [];
  const lettersIds = Database.data.folders.entities[folderId]?.letters || [];

  const filteredLetters = lettersIds
    .sort((idA, idB) => {
      const letterA = Database.data.letters.entities[idA];
      const letterB = Database.data.letters.entities[idB];

      return filters.sortType === SortType.NewestFirst
        ? new Date(letterB.date).getTime() - new Date(letterA.date).getTime()
        : new Date(letterA.date).getTime() - new Date(letterB.date).getTime();
    })
    .filter((id) => {
      const letter = Database.data.letters.entities[id];
      return applyFilter(filters, letter);
    });

  const data = filteredLetters
    .slice(from, to)
    .reduce((acc, id) => {
      const letter = Database.data.letters.entities[id];
      const normalizedLetter = normalizeShortLetter(letter);

      acc.letters.ids.push(id);
      acc.letters.entities[id] = normalizedLetter;

      if (!usersIds.includes(normalizedLetter.author)) {
        acc.users.ids.push(normalizedLetter.author);
        acc.users.entities[normalizedLetter.author] = Database.data.users.entities[normalizedLetter.author];
      }

      return acc;
    }, {
      letters: {
        ids: [],
        entities: {},
      },
      users: {
        ids: [],
        entities: {},
      }
    });

  return {
    totalLetters: filteredLetters.length,
    ...data
  };
};
