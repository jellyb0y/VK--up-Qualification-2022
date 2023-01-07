import type { Request, Response } from 'express';
import { getAvatarByUser } from '../selectors/getAvatarByUser';

export const getAvatar = (req: Request, res: Response) => {
  const { query: { id } } = req;

  if (!id) {
    return res.status(400).json({
      error: 'user id is required',
    });
  }

  const avatar = getAvatarByUser(id as string);

  if (!avatar) {
    return res.status(404).json({
      error: 'avatar not found',
    });
  }

  res.json({
    avatar,
  });
};
