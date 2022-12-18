import type { Request, Response } from 'express';
import { getLetterById } from '../selectors/getLetterById';

export const getLetter = (req: Request, res: Response) => {
  const { query: { id } } = req;

  if (!id) {
    return res.status(400).json({
      error: 'letter id is required',
    });
  }

  const data = getLetterById(id as string);

  res.json(data);
};
