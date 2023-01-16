import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'react';

import RuFlag from '@assets/images/ru_lan.svg';
import EnFlag from '@assets/images/en_lan.svg';
import Button, { ButtonMode, ContentAlign } from '@components/Button';
import Themes from './components/Themes';

import { useLanguages } from '@lib/Languages/useLanguages';
import { useLangContext } from '@lib/Languages/useContext';

import S from './Settings.scss';

import type { FC } from 'react';
import type { SettingsProps } from './types';
import { Languages as LanguagesType } from '@lib/Languages/types';
import Languages from './components/Languages';

enum MenuType {
  Themes = 'themes',
  Language = 'language',
}

const Settings: FC<SettingsProps> = ({
  containerRef,
}) => {
  const { lang } = useLangContext();
  const applyLanguage = useLanguages();
  const [menuType, setMenuType] = useState<MenuType>(MenuType.Themes);

  const createSideBarHandler = useCallback((type: MenuType) => () => {
    setMenuType(type);
  }, []);

  const language = useMemo(() => lang === LanguagesType.Ru ? (
    <>
      Русский
      <RuFlag className={S.flag} />
    </>
  ) : (
    <>
      English
      <EnFlag className={S.flag} />
    </>
  ), [lang]);

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
          <span className={S.buttonName}>
            {applyLanguage(['Внещний вид', 'Interface'])}
          </span>
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
          <span className={S.buttonName}>
            {applyLanguage(['Язык', 'Language'])}: {language}
          </span>
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
