import Database from '@database';
import { UsersEntity } from '@database/types';

export const getLetterById = (id: string) => {
  const letter = Database.data.letters.entities[id];
  const users: UsersEntity = {
    entities: {},
    ids: [],
  };

  users.entities[letter.author] = Database.data.users.entities[letter.author];
  users.ids.push(letter.author);

  letter.to.forEach((id) => {
    users.entities[id] = Database.data.users.entities[id];
    users.ids.push(id);
  });

  return {
    letter,
    users,
  }
};
