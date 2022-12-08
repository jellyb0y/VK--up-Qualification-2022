import { MD5 } from 'crypto-js';

import type { DenormalizedUser, User } from '../types';

export const normalizeUsers = (data: DenormalizedUser[]): User[] => {
  return data.map((item) => ({
    id: MD5(item.email).toString(),
    name: item.name,
    surname: item.surname,
    email: item.email,
    avatar: item.avatar,
  }));
};
