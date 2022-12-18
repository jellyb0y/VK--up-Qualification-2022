import { generatePath } from 'react-router-dom';
import { FOLDER_PATH } from '@app/routes';

export const getFolderUrl = (folder: string): string => {
  return generatePath(FOLDER_PATH, { folder });
};
