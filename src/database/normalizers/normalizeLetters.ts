import { MD5 } from 'crypto-js';

import { normalizeUsers } from './normalizeUsers';

import type { DenormalizedData, Letter } from '../types';

export const normalizeLetters = (data: DenormalizedData): Letter[] => {
  return data.map((item) => ({
    // Приходится генерировать айдишник, так как его нет в данных
    id: MD5(item.title + item.text + item.date).toString(),
    author: normalizeUsers([item.author])[0],
    to: normalizeUsers(item.to),
    title: item.title,
    text: item.text,
    bookmark: item.bookmark,
    important: item.important,
    read: item.read,
    folder: item.folder || 'Входящие',
    date: item.date,
    doc: item.doc && {
      img: item.doc.img,
    },
  }));
};
