import axios from 'axios';

import { BACKEND_BASE_URL } from '@constants';

import type { FoldersEntity } from '@database/types';

const API_URL = `${BACKEND_BASE_URL}/getAvatar`;

type GetAvatarResponseData = {
  avatar: string;
}

export const getUserAvatar = async (userId: string): Promise<GetAvatarResponseData> => {
  return axios.get(API_URL, {
    params: {
      id: userId,
    },
  }).then(({ data }: { data: GetAvatarResponseData }) => data);
};
