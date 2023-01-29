import { FOLDER_TRANSLATIONS } from './constants';

export const getTranslation = (folderName: string) => {
  return FOLDER_TRANSLATIONS[folderName] || folderName;
};
