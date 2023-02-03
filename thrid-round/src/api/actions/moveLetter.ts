import Database from '@database';

export interface MoveLetterParams {
  folder: string;
  letterId: string;
}

export const moveLetter = (params: MoveLetterParams) => {
  const { folder, letterId } = params;

  const letter = Database.data.letters.entities[letterId];

  if (!letter) {
    throw new Error('invalid letter id');
  }

  const prevFolderId = letter.folder;
  const prevFolder = Database.data.folders.entities[prevFolderId];

  const letterIdIndex = prevFolder.letters.indexOf(letterId);
  if (letterIdIndex !== -1) {
    prevFolder.letters.splice(letterIdIndex, 1);
  }

  const newFolder = Database.data.folders.entities[folder];
  newFolder.letters.push(letterId);

  letter.folder = folder;
};
