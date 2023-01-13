import { normalizeUsers } from './normalizeUsers';
import { normalizeUser } from './normalizeUser';
import { normalizeFolder } from './normalizeFolder';
import { generateHash } from '@utils/generateHash';

import type { Avatars, DenormalizedData, Folder, Letter, User } from '../types';

export const normalizeLetters = (data: DenormalizedData) => {
  const users: User[] = [];
  const folders: Folder[] = [];
  let avatars: Avatars = {};

  const letters: Letter[] = data.map((letter) => {
    const { user: author, avatar: authorAvatar } = normalizeUser(letter.author);
    const { users: toUsers, avatars: toUsersAvatars } = normalizeUsers(letter.to);
    const folder = normalizeFolder(letter.folder || 'Входящие');

    avatars = {
      ...avatars,
      [author.id]: authorAvatar,
      ...toUsersAvatars,
    };

    const letterId = generateHash(author.id + letter.title + letter.date);

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

    return {
      // Приходится генерировать айдишник, так как его нет в данных
      id: letterId,
      author: author.id,
      to: toUsers.map(({ id }) => id),
      title: letter.title,
      text: letter.text,
      bookmark: letter.bookmark,
      important: letter.important,
      read: letter.read,
      folder: folder.id,
      date: letter.date,
      isShort: false,
      hasDoc: Boolean(letter.doc),
      doc: letter.doc && {
        img: Array.isArray(letter.doc.img)
          ? letter.doc.img
          : [letter.doc.img],
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
