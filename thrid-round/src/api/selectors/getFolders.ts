import Database from '@database';
import type { FoldersEntity } from '@database/types';

export const getFolders = (): FoldersEntity => {
  const ids = Database.data.folders.ids;
  const entities = Object.entries(Database.data.folders.entities).reduce((acc, [folderName, folder]) => {
    acc[folderName] = {
      ...folder,
      letters: [],
      totalLetters: folder.letters.length,
    };

    return acc;
  }, {} as FoldersEntity['entities']);

  return {
    ids,
    entities,
  };
};
