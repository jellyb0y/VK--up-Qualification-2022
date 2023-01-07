import type { Request, Response } from 'express';
import { getFolders as getFoldersSelector } from '../selectors/getFolders';

export const getFolders = (req: Request, res: Response) => {
  const data = getFoldersSelector();
  res.json(data);
};
