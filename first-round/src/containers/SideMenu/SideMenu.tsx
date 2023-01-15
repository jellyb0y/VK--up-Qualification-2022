import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';

import Button, { ButtonMode, ContentAlign } from '@components/Button';
import StubComponent from '@components/StubComponent';

import IncomingsIcon from '@assets/images/incomings.svg';
import ImportantIcon from '@assets/images/importants.svg';
import SentIcon from '@assets/images/sent.svg';
import DraftsIcon from '@assets/images/drafts.svg';
import ArchiveIcon from '@assets/images/archive.svg';
import SpamIcon from '@assets/images/spam.svg';
import TrashIcon from '@assets/images/trash.svg';
import PlusIcon from '@assets/images/plus.svg';
import BurgerIcon from '@assets/images/burger.svg';
import PancilIcon from '@assets/images/pancil.svg';
import SettingsIcon from '@assets/images/gear.svg';

import { getFoldersOrder } from './utils/getFoldersOrder';
import { getFolderUrl } from '@utils/getFolderUrl';

import { ScreenType, useScreenObserver } from '@root/hooks/useScreenObserver';

import { ROOT_PATH } from '@app/routes';

import S from './SideMenu.scss';

import type { FC } from 'react';
import type { State } from '@data/types';
import type { SideMenuProps, FolderIcons } from './types';
import Settings from '@containers/Settings/Settings';

const DEFAULT_FOLDER = 'incomings';
const DEFAULT_ICON = ImportantIcon;

const FOLDER_ICONS: FolderIcons = {
  'incomings': IncomingsIcon,
  'sent': SentIcon,
  'drafts': DraftsIcon,
  'archive': ArchiveIcon,
  'spam': SpamIcon,
  'trash': TrashIcon,
};

const DESKTOP_FOLDERS_SORT = [
  'incomings',
  '*',
  'sent',
  'drafts',
  'archive',
  'spam',
  'trash',
];

const TABLET_FOLDERS_SORT = [
  'incomings',
  'sent',
  'drafts',
  'archive',
  'spam',
  'trash',
];

const mapStateToProps = (state: State) => ({
  folders: state.folders,
});

const SideMenu: FC<SideMenuProps> = ({ folders }) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const {
    folder: activeFolder = folders.activeFolder
  } = useParams<{ folder?: string }>();

  const [isLoaded, setLoaded] = useState(false);
  const screenType = useScreenObserver();

  const foldersSort = screenType !== ScreenType.Tablet ? DESKTOP_FOLDERS_SORT : TABLET_FOLDERS_SORT;
  const foldersIds = folders.ids.length > 0 ? folders.ids : foldersSort;
  const orderedFolders = getFoldersOrder(foldersSort, foldersIds);

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

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
        >
          <PancilIcon className={S.pancilIcon} />
          <span className={S.buttonName}>Написать письмо</span>
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
                  <span className={S.buttonName}>{name}</span>
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
          <span className={S.buttonName}>Новая папка</span>
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
        <span className={S.buttonName}>Настройки</span>
      </Button>
      {isSettingsOpen && <Settings onClose={closeSettings} />}
    </div>
  );
};

export default connect(mapStateToProps)(SideMenu);
