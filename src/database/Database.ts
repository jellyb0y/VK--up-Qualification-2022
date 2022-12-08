import { readFile } from 'fs/promises';
import { normalizeLetters } from './normalizers/normalizeLetters';

import type { Data, DenormalizedData, FoldersEntity, LettersEntity, UsersEntity } from './types';

export class Database {
  static data: Data;

  static async init(filePath: string): Promise<void> {
    return readFile(filePath)
      .then(buff => buff.toString())
      .then(json => JSON.parse(json))
      .then((data: DenormalizedData) => {
        // Нормализуем и сортируем по дате
        const normalizedLetters = normalizeLetters(data)
          .sort((letterA, letterB) => (
            new Date(letterB.date).getTime() - new Date(letterA.date).getTime()
          ));

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

        normalizedLetters.forEach((letter) => {
          // Перекладываем пользователей
          [...letter.to, letter.author].forEach((user) => {
            if (!usersEntity.entities[user.id]) {
              usersEntity.entities[user.id] = user;
              usersEntity.ids.push(user.id);
            }
          });
          
          if (!foldersEntity.entities[letter.folder]) {
            foldersEntity.entities[letter.folder] = [];
            foldersEntity.ids.push(letter.folder);
          }

          if (!foldersEntity.entities[letter.folder].includes(letter.id)) {
            foldersEntity.entities[letter.folder].push(letter.id);
          }

          lettersEntity.entities[letter.id] = letter;
          lettersEntity.ids.push(letter.id);
        });

        this.data = {
          letters: lettersEntity,
          users: usersEntity,
          folders: foldersEntity,
        };
      });
  } 
}
