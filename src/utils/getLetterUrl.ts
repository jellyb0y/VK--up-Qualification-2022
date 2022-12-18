import { generatePath } from 'react-router-dom';
import { LETTER_PATH } from '@app/routes';

export const getLetterUrl = (folder: string, id: string): string => {
  return generatePath(LETTER_PATH, { id, folder });
};
