import type { FoldersState } from '@data/reducers/folders';
import type { FC } from 'react';

export interface SideMenuProps {
  folders: FoldersState;
}

export type FolderIcons = Record<string, FC<{ className?: string }>>;

export type FolderTranslations = Record<string, string>;
