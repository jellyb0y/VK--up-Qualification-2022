import type { Folder } from '@database/types';

export const DEFAULT_ID = 'incomings';

export const FOLDER_IDS = {
  ['Входящие']: 'incomings',
  ['Важное']: 'important',
  ['Отправленные']: 'sent',
  ['Черновики']: 'drafts',
  ['Архив']: 'archive',
  ['Спам']: 'spam',
  ['Корзина']: 'trash',
};

export const normalizeFolder = (name: string): Folder => {
  const id = FOLDER_IDS[name] || DEFAULT_ID;

  return {
    id,
    name,
    letters: [],
    totalLetters: 0,
  };
};
