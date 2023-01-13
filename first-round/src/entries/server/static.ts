import Server from '@lib/Server';
import { createGzip } from 'zlib';
import { extname } from 'path';
import { access, createReadStream, constants } from 'fs';

import {
  ROOT_PATH,
} from '@constants';

const CONTENT_TYPES = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

export const staticRouter = Server.route();

staticRouter.get('/:file', (req, res, params) => {
  const { file } = params;

  if (!file) {
    res.statusCode = 500;
    res.endResponse();
    return;
  }

  const ext = extname(file);
  const contentType = CONTENT_TYPES[ext] || 'text/plain';
  const filePath = `${ROOT_PATH}/${file}`;

  access(filePath, constants.F_OK, (error) => {
    if (error) {
      if(error.code == 'ENOENT'){
        res.statusCode = 404;
        res.endResponse();
        return;
      }

      res.statusCode = 500;
      res.write('Error: ' + error.code + ' ..\n');
      res.endResponse();
      return;
    }

    res.writeHead(200, {
      'Content-Encoding': 'gzip',
      'Content-Type': `${contentType}; charset=utf-8`,
    });

    const raw = createReadStream(filePath);
    raw.pipe(createGzip()).pipe(res);
  });
});
