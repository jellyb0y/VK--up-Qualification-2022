import type {
  SetUserAvatarAction,
  UpdateUsersAction,
} from './types';

import { SET_USER_AVATAR, UPDATE_USERS } from './actions';

import type { UsersEntity } from '@database/types';

export const updateUsersAction = (users: UsersEntity): UpdateUsersAction => ({
  type: UPDATE_USERS,
  users,
});

export const setUserAvatarAction = (user: string, data: string): SetUserAvatarAction => ({
  type: SET_USER_AVATAR,
  user,
  data,
});
