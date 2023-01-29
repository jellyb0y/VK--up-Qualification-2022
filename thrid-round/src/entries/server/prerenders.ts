import { readFileSync, readdirSync } from 'fs';

import { INDEX_PATH, PRERENDERS_PATH } from '@constants';

const files = readdirSync(PRERENDERS_PATH);

export const indexHTML = readFileSync(INDEX_PATH);

export const prerenders = files.reduce((acc, filename) => {
  if (!filename.match(/\.html$/)) {
    return acc;
  }

  acc[filename] = readFileSync(`${PRERENDERS_PATH}/${filename}`).toString();
  return acc;
}, {} as Record<string, string>);
