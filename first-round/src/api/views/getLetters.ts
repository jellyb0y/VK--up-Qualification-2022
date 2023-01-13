import { getLettersByFolder } from '../selectors/getLettersByPage';

import type { Entrypoint } from '@lib/Server/types';

export const getLetters: Entrypoint = (req, res) => {
  const { query: { folder } } = req;

  if (!folder) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'folder id is required',
    }));
    return res.endResponse();
  }

  const data = getLettersByFolder(folder as string);

  res.statusCode = 200;
  res.write(JSON.stringify(data));
  res.endResponse();
};
