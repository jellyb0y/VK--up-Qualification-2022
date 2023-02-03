import type { FoldersState } from '@data/reducers/folders';
import type { FoldersEntity } from '@database/types';
import type { FC } from 'react';

export interface SideMenuProps {
  folders: FoldersState;
  onMoveLetter: (folderTo: string, id: string) => void;
}

export interface MenuButtonProps {
  id: string;
  folders: FoldersEntity['entities'];
  isLoaded: boolean;
  activeFolder: string;
  applyLanguage: (langs: [string, string]) => string;
  onMoveLetter: (folderTo: string, id: string) => void;
}

export type FolderIcons = Record<string, FC<{ className?: string }>>;

export type FolderTranslations = Record<string, string>;
