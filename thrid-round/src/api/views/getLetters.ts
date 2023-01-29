import { getLettersByFolder } from '../selectors/getLettersByPage';
import { FiltersState, SortType } from '@data/reducers/filters';

import type { Entrypoint } from '@lib/Server/types';

export const getLetters: Entrypoint = (req, res) => {
  const {
    query: {
      folder,
      from: qFrom,
      to: qTo,
      sortType,
      bookmarkFilter,
      readFilter,
      attachmentsFilter,
    },
  } = req;

  if (!folder) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'folder id is required',
    }));
    return res.endResponse();
  }

  const from = qFrom ? Number(qFrom) : undefined;
  const to = qTo ? Number(qTo) : undefined;

  const filters: FiltersState = {
    sortType: (sortType as SortType) || SortType.NewestFirst,
    readFilter: Boolean(Number(readFilter)),
    bookmarkFilter: Boolean(Number(bookmarkFilter)),
    attachmentsFilter: Boolean(Number(attachmentsFilter)),
  };

  const data = getLettersByFolder(folder as string, from, to, filters);

  res.statusCode = 200;
  res.write(JSON.stringify(data));
  res.endResponse();
};
