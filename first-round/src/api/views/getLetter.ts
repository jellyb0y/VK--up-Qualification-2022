import { getLetterById } from '../selectors/getLetterById';

import type { Entrypoint } from '@lib/Server/types';

export const getLetter: Entrypoint = (req, res) => {
  const { query: { id } } = req;

  if (!id) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'letter id is required',
    }));
    return res.endResponse();
  }

  const data = getLetterById(id as string);

  res.statusCode = 200;
  res.write(JSON.stringify(data));
  res.endResponse();
};
