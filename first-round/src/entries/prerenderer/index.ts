import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

import { PATHS } from './paths';
import { PRERENDERS_PATH } from '@constants';
import { Themes } from '@lib/Themes/types';
import { mockUrl } from '@utils/mockUrl';
import { renderer } from './renderer';

if (!existsSync(PRERENDERS_PATH)) {
  mkdir(PRERENDERS_PATH);
}

PATHS.forEach((pattern: string) => {
  const url = mockUrl(pattern);
  Object.values(Themes).forEach(async (theme: Themes) => {
    const html = await renderer(url, theme);
    const patternCode = Buffer.from(pattern).toString('base64');
    const filePath = `${PRERENDERS_PATH}/{${patternCode}}_${theme}.html`;

    await writeFile(filePath, html);
    console.log(`Prerendered: ${pattern} [${theme}]`);
  });
});
