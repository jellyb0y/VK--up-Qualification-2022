import { getDocByLetterId } from '../selectors/getDocByLetterId';

import type { Entrypoint } from '@lib/Server/types';

export const getLetterDoc: Entrypoint = (req, res) => {
  const { query: { id } } = req;

  if (!id) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'letter id is required',
    }));
    return res.endResponse();
  }

  const doc = getDocByLetterId(id as string);

  res.statusCode = 200;
  res.write(JSON.stringify({ doc }));
  res.endResponse();
};
