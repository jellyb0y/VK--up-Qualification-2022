import classnames from 'classnames';
import { useCallback, useState } from 'react';

import Button, { ButtonMode, ContentAlign } from '@components/Button';

import S from './Settings.scss';

import { FC } from 'react';
import type { SettingsProps } from './types';
import Themes from './components/Themes';
import Languages from './components/Languages';

enum MenuType {
  Themes = 'themes',
  Language = 'language',
}

const Settings: FC<SettingsProps> = ({
  containerRef,
}) => {
  const [menuType, setMenuType] = useState<MenuType>(MenuType.Themes);

  const createSideBarHandler = useCallback((type: MenuType) => () => {
    setMenuType(type);
  }, []);

  return (
    <div ref={containerRef} className={S.root}>
      <div className={S.sideBar}>
        <Button
          stretch
          contentAlign={ContentAlign.Left}
          mode={ButtonMode.Contrast}
          onClick={createSideBarHandler(MenuType.Themes)}
          selected={menuType === MenuType.Themes}
          className={classnames(S.button, {
            [S.selectedButton]: menuType === MenuType.Themes
          })}
        >
          <span className={S.buttonName}>Внещний вид</span>
        </Button>
        <Button
          stretch
          contentAlign={ContentAlign.Left}
          mode={ButtonMode.Contrast}
          onClick={createSideBarHandler(MenuType.Language)}
          selected={menuType === MenuType.Language}
          className={classnames(S.button, {
            [S.selectedButton]: menuType === MenuType.Language
          })}
        >
          <span className={S.buttonName}>Язык: Русский</span>
        </Button>
      </div>
      <div className={S.menu}>
        {menuType === MenuType.Themes ? (
          <Themes />
        ) : (
          <Languages />
        )}
      </div>
    </div>
  );
};

export default Settings;
