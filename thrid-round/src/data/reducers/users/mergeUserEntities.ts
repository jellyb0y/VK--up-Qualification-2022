import type { UsersEntity } from '@database/types';

export const mergeUserEntities = (entitiesA: UsersEntity['entities'], entitiesB: UsersEntity['entities']): UsersEntity['entities'] => {
  const usersB = Object.values(entitiesB);

  const result = {
    ...entitiesA,
  };

  usersB.forEach((user) => {
    result[user.id] = {
      ...result[user.id],
      ...user
    };
  });

  return result;
};
