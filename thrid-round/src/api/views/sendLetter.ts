import { addLetter } from '@api/actions/addLetter';
import type { SendLetterParams } from '@data/resourses/letters/sendLetter';
import type { Entrypoint } from '@lib/Server/types';

export const sendLetter: Entrypoint = (req, res) => {
  const { body } = req;
  const parsedBody = JSON.parse(body);

  const data = parsedBody.data as SendLetterParams;

  if (!data) {
    res.statusCode = 400;
    res.write(JSON.stringify({
      error: 'missing data',
    }));
    return res.endResponse();
  }

  addLetter(data);

  res.statusCode = 200;
  res.write(JSON.stringify({ message: 'ok' }));
  res.endResponse();
};
