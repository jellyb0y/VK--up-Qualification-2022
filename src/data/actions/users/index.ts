import type {
  UpdateUsersAction,
} from './types';

import { UPDATE_USERS } from './actions';

import type { UsersEntity } from '@database/types';

export const updateUsersAction = (users: UsersEntity): UpdateUsersAction => ({
  type: UPDATE_USERS,
  users,
});
