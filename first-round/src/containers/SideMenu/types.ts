import type { FoldersState } from '@data/reducers/folders';
import type { FC } from 'react';

export interface SideMenuProps {
  folders: FoldersState;
}

export type FolderIcons = {
  [key: string]: FC<{ className?: string }>;
}
