import { createContext } from 'react';

import type { Context as ContextType } from './types';

export const Context = createContext<ContextType | null>(null);
