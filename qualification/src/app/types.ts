import type { State } from '@data/types';
import type { Store } from 'redux';

export interface AppProps {
  store: Store<State>;
}
