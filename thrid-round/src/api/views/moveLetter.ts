import { moveLetter as moveLetterAction } from '@api/actions/moveLetter';
import type { MoveLetterParams } from '@api/actions/moveLetter';
import type { Entrypoint } from '@lib/Server/types';

export const moveLetter: Entrypoint = (req, res) => {
  const { body } = req;
  const parsedBody = JSON.parse(body);

  const data = parsedBody as MoveLetterParams;

  if (!data) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'missing data',
    }));

    return res.endResponse();
  }

  if (!data.letterId) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'missing data.letterId',
    }));

    return res.endResponse();
  }

  if (!data.folder) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'missing data.folder',
    }));

    return res.endResponse();
  }

  moveLetterAction(data);

  res.statusCode = 200;
  res.write(JSON.stringify({ message: 'ok' }));
  res.endResponse();
};
