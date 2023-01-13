import { getFolders as getFoldersSelector } from '../selectors/getFolders';

import type { Entrypoint } from '@lib/Server/types';

export const getFolders: Entrypoint = (req, res) => {
  const data = getFoldersSelector();
  res.statusCode = 200;
  res.write(JSON.stringify(data));
  res.endResponse();
};
