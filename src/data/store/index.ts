import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '@root/data';
import thunk from 'redux-thunk';

import type { State } from '../types';

export const createStore = (data: State) => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: data,
});
