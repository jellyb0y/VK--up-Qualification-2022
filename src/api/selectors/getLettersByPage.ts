import Database from '@database';
import { normalizeShortLetter } from '@database/normalizers/normalizeShortLetter';

import type { IdList, ShortLettersEntity, UsersEntity } from '@database/types';

export const getLettersByFolder = (folderId: string) => {
  const usersIds: IdList = [];
  const lettersIds = Database.data.folders.entities[folderId]?.letters || [];
  const lettersEntities: ShortLettersEntity['entities'] = lettersIds.reduce((acc, id) => {
    const letter = Database.data.letters.entities[id];
    acc[id] = normalizeShortLetter(letter);

    if (!usersIds.includes(letter.author)) {
      usersIds.push(letter.author);
    }

    return acc;
  }, {});

  const usersEntities: UsersEntity['entities'] = usersIds.reduce((acc, id) => {
    const user = Database.data.users.entities[id];
    acc[id] = user;

    return acc;
  }, {});

  return {
    letters: {
      ids: lettersIds,
      entities: lettersEntities,
    },
    users: {
      ids: usersIds,
      entities: usersEntities,
    }
  };
};
