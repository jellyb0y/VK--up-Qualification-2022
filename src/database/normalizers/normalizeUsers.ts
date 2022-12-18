import { normalizeUser } from './normalizeUser';

import type { DenormalizedUser } from '../types';

export const normalizeUsers = (data: DenormalizedUser[]) => {
  return data.reduce((acc, denormalizedUser) => {
    const { user, avatar } = normalizeUser(denormalizedUser);
    acc.users.push(user);

    if (avatar) {
      acc.avatars[user.id] = avatar;
    }

    return acc;
  }, {
    users: [],
    avatars: {},
  });
};
