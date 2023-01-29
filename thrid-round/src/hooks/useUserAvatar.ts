import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { State } from '@data/types';
import { getUserAvatarResolver } from '@data/resolvers/users/getUserAvatarResolver';

const createAvatarSelector = (userId: string) => (state: State): string | undefined => (
  state.users.entities[userId]?.avatar
);

export const useUserAvatar = (userId: string, stub?: boolean) => {
  const avatar = useSelector(createAvatarSelector(userId));
  const dispatch = useDispatch();

  const isInitialized = useRef(false);

  useEffect(() => {
    if (stub || avatar || isInitialized.current) {
      return;
    }

    dispatch(getUserAvatarResolver(userId));
    isInitialized.current = true;
  }, [stub, userId, avatar]);

  return avatar;
};
