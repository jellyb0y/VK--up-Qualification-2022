import { setUserAvatarAction } from '@data/actions/users';
import { getUserAvatar } from '@data/resourses/users/getUserAvatar';

import type { Dispatch } from '@reduxjs/toolkit';

export const getUserAvatarResolver = (userId: string) => {
  return (dispatch: Dispatch) => {    
    getUserAvatar(userId)
      .then(({ avatar }) => dispatch(setUserAvatarAction(userId, avatar)))
      .catch(() => null)
  };
};
