import { useRoutes } from 'react-router-dom';

import Layout from '@containers/Layout';
import Folders from '@pages/Folders';
import Letter from '@pages/Letter';

import * as Routes from './routes';

import type { FC } from 'react';

export const Router: FC = () => useRoutes([
  { path: Routes.ROOT_PATH, element: <Layout><Folders /></Layout>  },
  { path: Routes.FOLDER_PATH, element: <Layout><Folders /></Layout> },
  { path: Routes.LETTER_PATH, element: <Layout><Letter /></Layout> }
]);
