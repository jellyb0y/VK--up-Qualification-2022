import type { Entrypoint } from '@lib/Server/types';

export const emptyResponse: Entrypoint = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({
    error: 'method not found'
  }));

  return res.endResponse();
};
