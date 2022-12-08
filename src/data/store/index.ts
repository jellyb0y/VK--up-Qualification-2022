import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '@root/data';
import thunk from 'redux-thunk';

import type { Store } from 'redux';
import type { State } from '../types';

export const createStore = (data: State): Store => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: data,
});
