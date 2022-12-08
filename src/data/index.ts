import { combineReducers } from 'redux';

import { letters } from './reducers/letters';

export const reducer = combineReducers({
  letters,
});
