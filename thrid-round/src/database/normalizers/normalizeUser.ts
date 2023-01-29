import { generateHash } from '@utils/generateHash';

import type { DenormalizedUser } from '../types';

export const normalizeUser = (item: DenormalizedUser) => ({
  user: {
    id: generateHash(item.email),
    name: item.name,
    surname: item.surname,
    email: item.email,
    hasAvatar: !!item.avatar,
  },
  avatar: item.avatar,
});
