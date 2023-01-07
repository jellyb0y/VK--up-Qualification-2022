import type { UsersEntity } from '@database/types';
import type { BaseAction } from '@data/types/actions';

export interface UpdateUsersAction extends BaseAction<'UPDATE_USERS'> {
  users: UsersEntity;
}

export type ActionTypes =
  | UpdateUsersAction;
