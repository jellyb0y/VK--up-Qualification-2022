import { UPDATE_USERS } from '../../actions/users/actions';

import type { ActionTypes } from '@root/data/actions/users/types';
import type { UsersState } from './types';

export const getInitialState = (): UsersState => ({
  entities: {},
  ids: [],
});

export const users = (state = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.users.entities,
        },
        ids: Array.from(new Set([
          ...state.ids,
          ...action.users.ids,
        ])),
      };

    default:
      return state;
  }
};
