import { readFileSync } from 'fs';

import { INDEX_PATH, PRELOADED_STATE_KEY } from '@constants';

const template = readFileSync(INDEX_PATH).toString();

export const templator = (appHTML: string, state: object, headTags: string[]): string => {
  const stringifiedState = JSON.stringify(state);

  let htmlString = template
    .replace('<div id="root"></div>', (
      `<div id="root">${appHTML}</div>` +
      `<script>window.${PRELOADED_STATE_KEY} = ${stringifiedState}</script>`
    ));

  headTags.reverse().forEach((tag: string) => {
    htmlString = htmlString.replace('<head>', `<head>${tag}`);
  });

  return htmlString;
};
