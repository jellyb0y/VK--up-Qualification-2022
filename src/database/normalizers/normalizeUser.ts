import { MD5 } from 'crypto-js';

import type { DenormalizedUser, User } from '../types';

export const normalizeUser = (item: DenormalizedUser) => ({
  user: {
    id: MD5(item.email).toString(),
    name: item.name,
    surname: item.surname,
    email: item.email,
    hasAvatar: !!item.avatar,
  },
  avatar: item.avatar,
});
