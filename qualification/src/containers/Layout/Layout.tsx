import S from './Layout.scss';

import Header from '@components/Header';
import SideMenu from '@containers/SideMenu';

import type { FC } from 'react';
import type { LayoutProps } from './types';

const Layout: FC<LayoutProps> = ({ disableSidebar, children }) => {
  return (
    <div className={S.root}>
      <Header />
      <div className={S.mainContainer}>
        {!disableSidebar && <SideMenu />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
