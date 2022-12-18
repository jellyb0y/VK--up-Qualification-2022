import type { Request, Response } from 'express';
import { getLettersByFolder } from '../selectors/getLettersByPage';

export const getLetters = (req: Request, res: Response) => {
  const { query: { folder } } = req;

  if (!folder) {
    return res.status(400).json({
      error: 'folder id is required',
    });
  }

  const data = getLettersByFolder(folder as string);

  res.json(data);
};
