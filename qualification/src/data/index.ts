import { combineReducers } from 'redux';

import { letters } from './reducers/letters';
import { folders } from './reducers/folders';
import { users } from './reducers/users';

export const reducer = combineReducers({
  letters,
  folders,
  users,
});
