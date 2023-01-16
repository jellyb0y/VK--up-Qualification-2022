import { normalizeUsers } from './normalizeUsers';
import { normalizeUser } from './normalizeUser';
import { normalizeFolder } from './normalizeFolder';
import { generateHash } from '@utils/generateHash';

import type { Avatars, DenormalizedData, Folder, Letter, User } from '../types';
import { IS_PRODUCTION } from '@constants';

export const normalizeLetters = (data: DenormalizedData) => {
  const users: User[] = [];
  const folders: Folder[] = [];
  let avatars: Avatars = {};

  const letters: Letter[] = data.map((letter) => {
    const {
      author: letterAuthor,
      to: letterTo,
      folder: letterFolder,
      title: letterTitle,
      date: letterDate,
      text: letterText,
      bookmark: letterBookmark,
      important: letterImportant,
      read: letterRead,
      doc: letterDoc,
      flag: letterFlag,
      ...unusedParams
    } = letter;

    const { user: author, avatar: authorAvatar } = normalizeUser(letterAuthor);
    const { users: toUsers, avatars: toUsersAvatars } = normalizeUsers(letterTo);
    const folder = normalizeFolder(letterFolder || 'Входящие');

    avatars = {
      ...avatars,
      [author.id]: authorAvatar,
      ...toUsersAvatars,
    };

    const letterId = generateHash(author.id + letterTitle + letterDate);

    [...toUsers, author].forEach((user) => {
      if (!users.some(({ id }) => id === user.id)) {
        users.push(user);
      }
    });

    folder.letters = [letterId];
    const existFolder = folders.find(({ id }) => id === folder.id);

    if (!existFolder) {
      folders.push(folder);
    } else {
      existFolder.letters = [
        ...existFolder.letters,
        ...folder.letters,
      ];
    }

    // Трекаем какие параметры остались не разрбраны
    if (!IS_PRODUCTION && Object.keys(unusedParams).length) {
      console.warn('[WARNING]: unused letter params:', unusedParams);
    }

    return {
      // Приходится генерировать айдишник, так как его нет в данных
      id: letterId,
      author: author.id,
      to: toUsers.map(({ id }) => id),
      title: letterTitle,
      text: letterText,
      bookmark: letterBookmark,
      important: letterImportant,
      read: letterRead,
      folder: folder.id,
      category: letterFlag,
      date: letterDate,
      type: 'full',
      hasDoc: Boolean(letterDoc),
      doc: letterDoc && {
        img: Array.isArray(letterDoc.img)
          ? letterDoc.img
          : [letterDoc.img],
      },
    };
  });

  return {
    letters,
    users,
    folders,
    avatars,
  }
};
