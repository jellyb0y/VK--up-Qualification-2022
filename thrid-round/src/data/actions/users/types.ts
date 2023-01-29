import type { UsersEntity } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateUsersAction extends BaseAction<'@users/UPDATE_USERS'> {
  users: UsersEntity;
}

export interface SetUserAvatarAction extends BaseAction<'@users/SET_USER_AVATAR'> {
  user: string;
  data: string;
}

export type ActionTypes =
  | UpdateUsersAction
  | SetUserAvatarAction;
