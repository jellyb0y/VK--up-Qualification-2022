import { promises as fsPromises } from 'fs';
import { normalizeLetters } from './normalizers/normalizeLetters';

import type { Data, DenormalizedData, FoldersEntity, LettersEntity, UsersEntity } from './types';

class Database {
  static data: Data;

  static async init(filePath: string): Promise<void> {
    return fsPromises.readFile(filePath)
      .then(buff => buff.toString())
      .then(json => JSON.parse(json))
      .then((data: DenormalizedData) => {
        // Нормализуем и сортируем по дате
        const {
          letters,
          users,
          folders,
          avatars,
        } = normalizeLetters(data);

        const lettersEntity: LettersEntity = {
          ids: [],
          entities: {},
        };

        const usersEntity: UsersEntity = {
          ids: [],
          entities: {},
        };

        const foldersEntity: FoldersEntity = {
          ids: [],
          entities: {},
        };

        letters.forEach((letter) => {
          // Перекладываем пользователей
          lettersEntity.entities[letter.id] = letter;
          lettersEntity.ids.push(letter.id);
        });

        users.forEach((user) => {
          if (!usersEntity.entities[user.id]) {
            usersEntity.entities[user.id] = user;
            usersEntity.ids.push(user.id);
          }
        });

        folders.forEach((folder) => {
          if (!foldersEntity.entities[folder.id]) {
            foldersEntity.entities[folder.id] = folder;
            foldersEntity.ids.push(folder.id);
          } else {
            foldersEntity.entities[folder.id].letters = [
              ...foldersEntity.entities[folder.id].letters,
              ...folder.letters,
            ];
          }
        });

        this.data = {
          letters: lettersEntity,
          users: usersEntity,
          folders: foldersEntity,
          avatars,
        };
      });
  } 
}

export default Database;
