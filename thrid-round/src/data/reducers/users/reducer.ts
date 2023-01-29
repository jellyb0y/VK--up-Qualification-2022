import { SET_USER_AVATAR, UPDATE_USERS } from '../../actions/users/actions';

import { mergeUserEntities } from './mergeUserEntities';

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
        entities: mergeUserEntities(
          state.entities,
          action.users.entities
        ),
        ids: Array.from(new Set([
          ...state.ids,
          ...action.users.ids,
        ])),
      };
    
    case SET_USER_AVATAR:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.user]: {
            ...state.entities[action.user],
            avatar: action.data,
          },
        },
      };

    default:
      return state;
  }
};
