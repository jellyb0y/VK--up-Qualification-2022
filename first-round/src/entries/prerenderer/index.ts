import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

import '@themes';

import { PATHS } from './paths';
import { PRERENDERS_PATH } from '@constants';
import { Schemes } from '@lib/Themes/types';
import { mockUrl } from '@utils/mockUrl';
import { renderer } from './renderer';

if (!existsSync(PRERENDERS_PATH)) {
  mkdir(PRERENDERS_PATH);
}

PATHS.forEach((pattern: string) => {
  const url = mockUrl(pattern);
  Object.values(Schemes).forEach(async (scheme: Schemes) => {
    const html = await renderer(url, scheme);
    const patternCode = Buffer.from(pattern).toString('base64');
    const filePath = `${PRERENDERS_PATH}/{${patternCode}}_${scheme}.html`;

    await writeFile(filePath, html);
    console.log(`Prerendered: ${pattern} [${scheme}]`);
  });
});
