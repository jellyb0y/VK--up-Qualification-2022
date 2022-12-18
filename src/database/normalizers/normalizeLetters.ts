import { MD5 } from 'crypto-js';

import { normalizeUsers } from './normalizeUsers';
import { normalizeUser } from './normalizeUser';
import { normalizeFolder } from './normalizeFolder';

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

    const letterId = MD5(author.id + letter.title + letter.date).toString();

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
      doc: letter.doc && {
        img: letter.doc.img,
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
