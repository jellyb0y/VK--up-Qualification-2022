import type { ShortLetter, UsersEntity } from '@database/types';
import type { Range } from '@hooks/useVirtualList';

export interface ListProps {
  itemHeight: number;
  visilbeRange: Range;
  activeFolder: string;
  letters: ShortLetter[];
  users: UsersEntity['entities'];
}
