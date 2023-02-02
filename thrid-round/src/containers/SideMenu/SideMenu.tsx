import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';

import Button, { ButtonMode, ContentAlign } from '@components/Button';
import StubComponent from '@components/StubComponent';
import Settings from '@containers/Settings/Settings';
import LetterCompose from '@containers/LetterCompose';

import PlusIcon from '@assets/images/plus.svg';
import BurgerIcon from '@assets/images/burger.svg';
import PancilIcon from '@assets/images/pancil.svg';
import SettingsIcon from '@assets/images/gear.svg';

import { getFoldersOrder } from './utils/getFoldersOrder';
import { getFolderUrl } from '@utils/getFolderUrl';
import { useLanguages } from '@lib/Languages/useLanguages';
import { getTranslation } from './getTranslation';

import { ScreenType, useScreenObserver } from '@root/hooks/useScreenObserver';

import { ROOT_PATH } from '@app/routes';
import { DEFAULT_FOLDER, DEFAULT_ICON, DESKTOP_FOLDERS_SORT, FOLDER_ICONS, TABLET_FOLDERS_SORT } from './constants';

import S from './SideMenu.scss';

import type { FC } from 'react';
import type { State } from '@data/types';
import type { SideMenuProps } from './types';

const mapStateToProps = (state: State) => ({
  folders: state.folders,
});

const SideMenu: FC<SideMenuProps> = ({ folders }) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isComposeOpen, setComposeOpen] = useState(false);

  const {
    folder: activeFolder = folders.activeFolder
  } = useParams<{ folder?: string }>();

  const [isLoaded, setLoaded] = useState(false);
  const screenType = useScreenObserver();
  const applyLanguage = useLanguages();

  const foldersSort = screenType !== ScreenType.Tablet ? DESKTOP_FOLDERS_SORT : TABLET_FOLDERS_SORT;
  const foldersIds = folders.ids.length > 0 ? folders.ids : foldersSort;
  const orderedFolders = getFoldersOrder(foldersSort, foldersIds);

  const openSettings = () => setSettingsOpen(true);

  const closeSettings = () => setSettingsOpen(false);

  const openCompose = () => setComposeOpen(true);

  const closeCompose = () => setComposeOpen(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={S.root}>
      <div className={S.topMenu}>
        <Button
          stretch
          contentAlign={ContentAlign.Center}
          mode={ButtonMode.Primary}
          className={S.button}
          onClick={openCompose}
        >
          <PancilIcon className={S.pancilIcon} />
          <span className={S.buttonName}>
            {applyLanguage(['Написать письмо', 'Compose'])}
          </span>
        </Button>
        <div className={S.list}>
          {screenType === ScreenType.Tablet && (
            <Button
              stretch
              key="burger"
              contentAlign={ContentAlign.Center}
              mode={ButtonMode.Contrast}
              className={S.button}
            >
              <BurgerIcon className={S.icon}/>
            </Button>
          )}
          {orderedFolders.map((id) => {
            const IconComponent = FOLDER_ICONS[id] || DEFAULT_ICON;
            const { name } = folders.entities[id] || {};
            const url = id === DEFAULT_FOLDER ? ROOT_PATH : getFolderUrl(id);

            return (
              <Button
                key={id}
                href={url}
                stretch
                // Fix: несовпадение html при гидрации
                selected={isLoaded && id === activeFolder}
                contentAlign={ContentAlign.Left}
                mode={ButtonMode.Contrast}
                className={classnames(S.listItem, S.button)}
              >
                <span className={S.iconWrapper}>
                  <IconComponent className={S.icon}/>
                </span>
                {name ? (
                  <span className={S.buttonName}>
                    {applyLanguage([name, getTranslation(name)])}
                  </span>
                ) : (
                  <StubComponent
                    className={classnames(S.buttonName, S.buttonNameStub)}
                  />
                )}
                {/* <span className={S.counter}>{letters.length}</span> */}
              </Button>
            );
          })}
        </div>
        <Button
          stretch
          contentAlign={ContentAlign.Left}
          mode={ButtonMode.Contrast}
          className={classnames(S.addFolderButton, S.button)}
        >
          <PlusIcon className={S.plusIcon} />
          <span className={S.buttonName}>
            {applyLanguage(['Новая папка', 'New folder'])}
          </span>
        </Button>
      </div>
      <Button
        stretch
        contentAlign={ContentAlign.Left}
        mode={ButtonMode.Contrast}
        className={S.button}
        onClick={openSettings}
      >
        <SettingsIcon className={S.settingsIcon} />
        <span className={S.buttonName}>
          {applyLanguage(['Настройки', 'Settings'])}
        </span>
      </Button>

      {isSettingsOpen && <Settings onClose={closeSettings} />}
      {isComposeOpen && <LetterCompose onClose={closeCompose} />}
    </div>
  );
};

export default connect(mapStateToProps)(SideMenu);
