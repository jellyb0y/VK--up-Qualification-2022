import { Controller } from '@utils/abortController';
import { request } from '@utils/request';

import { BACKEND_BASE_URL } from '@constants';

const API_URL = `${BACKEND_BASE_URL}/getAvatar`;

type GetAvatarResponseData = {
  avatar: string;
}

const controller = new Controller();

export const getUserAvatar = async (userId: string): Promise<GetAvatarResponseData> => {
  const signal = controller.instance(userId);

  return request(API_URL, {
    signal,
    params: {
      id: userId,
    },
  });
};
