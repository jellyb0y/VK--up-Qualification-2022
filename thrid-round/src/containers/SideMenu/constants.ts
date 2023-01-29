import IncomingsIcon from '@assets/images/incomings.svg';
import ImportantIcon from '@assets/images/importants.svg';
import SentIcon from '@assets/images/sent.svg';
import DraftsIcon from '@assets/images/drafts.svg';
import ArchiveIcon from '@assets/images/archive.svg';
import SpamIcon from '@assets/images/spam.svg';
import TrashIcon from '@assets/images/trash.svg';

import type { FolderIcons, FolderTranslations } from './types';

export const DEFAULT_FOLDER = 'incomings';
export const DEFAULT_ICON = ImportantIcon;

export const FOLDER_TRANSLATIONS: FolderTranslations = {
  'Входящие': 'Inbox',
  'Отправленные': 'Sent',
  'Черновики': 'Drafts',
  'Архив': 'Archive',
  'Спам': 'Spam',
  'Корзина': 'Trash',
};

export const FOLDER_ICONS: FolderIcons = {
  'incomings': IncomingsIcon,
  'sent': SentIcon,
  'drafts': DraftsIcon,
  'archive': ArchiveIcon,
  'spam': SpamIcon,
  'trash': TrashIcon,
};

export const DESKTOP_FOLDERS_SORT = [
  'incomings',
  '*',
  'sent',
  'drafts',
  'archive',
  'spam',
  'trash',
];

export const TABLET_FOLDERS_SORT = [
  'incomings',
  'sent',
  'drafts',
  'archive',
  'spam',
  'trash',
];
