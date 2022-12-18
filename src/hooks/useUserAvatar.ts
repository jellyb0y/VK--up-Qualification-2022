import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { BACKEND_BASE_URL } from '@constants';

const API_URL = `${BACKEND_BASE_URL}/getAvatar`;

type GetAvatarResponseData = {
  avatar: string;
}

export const useUserAvatar = (userId: string, stub?: boolean) => {
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState<string>();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (stub) {
      return;
    }

    axios.get(API_URL, {
      params: {
        id: userId,
      },
    })
      .then(({ data }: { data: GetAvatarResponseData }) => {
        if (!isMountedRef.current) {
          return;
        }

        setData(data.avatar);
      })
      .catch(() => {
        if (!isMountedRef.current) {
          return;
        }

        setFailed(false);
      });
  }, [stub]);

  return {
    failed,
    data,
  };
};
