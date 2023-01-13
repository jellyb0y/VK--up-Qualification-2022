import { getAvatarByUser } from '../selectors/getAvatarByUser';

import type { Entrypoint } from '@lib/Server/types';

export const getAvatar: Entrypoint = (req, res) => {
  const { query: { id } } = req;

  if (!id) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'user id is required'
    }));
    return res.endResponse();
  }

  const avatar = getAvatarByUser(id as string);

  if (!avatar) {
    res.statusCode = 404;
    res.write(JSON.stringify({
      error: 'avatar not found',
    }));
    return res.endResponse();
  }

  res.write(JSON.stringify({
    avatar,
  }));
  res.endResponse();
};
