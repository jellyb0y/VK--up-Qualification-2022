import S from './Layout.scss';

import Header from '@components/Header';
import SideMenu from '@containers/SideMenu';

import type { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <div className={S.root}>
      <Header />
      <div className={S.innerContainer}>
        <div className={S.sidebar}>
          <SideMenu />
        </div>
        <div className={S.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
