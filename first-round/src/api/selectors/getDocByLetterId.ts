import Database from '@database';

export const getDocByLetterId = (id: string) => {
  return Database.data.letters.entities[id].doc;
};
