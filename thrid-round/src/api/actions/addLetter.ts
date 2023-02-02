import Database from '@database';

import type{ SendLetterParams } from '@data/resourses/letters/sendLetter';
import type { Letter } from '@database/types';
import type { Attributes, WysiwygData } from '@components/Wysiwyg/utils/transformToData';
import { generateHash } from '@utils/generateHash';

const HARDCODE_FOLDER = 'sent';
const HARDCODE_USER_FROM = 0;
const HARDCODE_USER_TO = 1;

const FORBIDEN_TAGS = ['script', 'link'];

const attrsToString = (attrs: Attributes): string => {
  return Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(' ');
};

const formatWysiwygData = (data: WysiwygData): string => {
  return data
    .map((item) => {
      if (typeof item === 'string') {
        return item.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      if (FORBIDEN_TAGS.includes(item.tag.toLowerCase())) {
        return false;
      }

      const attrsString = attrsToString(item.attrs);
      return `<${item.tag} ${attrsString}>${formatWysiwygData(item.children)}</${item.tag}>`
    })
    .filter(Boolean)
    .join('');
}

export const addLetter = (params: SendLetterParams) => {
  const letter: Letter = {
    // Дикий хардкод
    id: generateHash(new Date().toString() + Math.random()),
    type: 'full',
    author: Database.data.users.ids[HARDCODE_USER_FROM],
    to: [Database.data.users.ids[HARDCODE_USER_TO]],
    title: params.subj,
    text: formatWysiwygData(params.data),
    bookmark: false,
    important: false,
    folder: HARDCODE_FOLDER,
    read: false,
    date: new Date().toString(),
    hasDoc: false,
  };

  Database.data.letters.entities[letter.id] = letter;
  Database.data.letters.ids.push(letter.id);
  Database.data.folders.entities[HARDCODE_FOLDER]?.letters.push(letter.id);
};
