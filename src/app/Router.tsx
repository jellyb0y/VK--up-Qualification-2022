import { useRoutes } from 'react-router';

import * as Routes from './routes';

import type { FC } from 'react';

export const Router: FC = () => useRoutes([
  { path: Routes.ROOT_ROUTE, element: <>hello</>  },
]);
