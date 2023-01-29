import FoldersListStub from '@components/FoldersListStub';
import List from './components/List';

import { useVirtualList } from '@hooks/useVirtualList';

import S from './LettersList.scss';

import type { FC } from 'react';
import type { LettersListProps } from './types';

const VISIBLE_OFFSET = 15;
const PRELOAD_OFFSET = 10;
const SCROLL_DEBOUNCE = 200;

const LettersList: FC<LettersListProps> = ({
  totalLetters,
  activeFolder,
  letters,
  users,
  isLoading,
  preloadLetters,
}) => {
  const {
    itemHeight = 0,
    visilbeRange,
    listRef,
    scrollRef,
  } = useVirtualList<HTMLDivElement, HTMLDivElement>({
    totalItems: totalLetters,
    itemsCount: letters.length,
    visibleOffset: VISIBLE_OFFSET,
    preloadOffset: PRELOAD_OFFSET,
    scrollDebounce: SCROLL_DEBOUNCE,
    onPreload: preloadLetters,
  });

  return (
    <div className={S.root}>
      <div ref={scrollRef} className={S.scroll}>
        <div ref={listRef} className={S.list}>
          {!isLoading || letters.length ? (
            <List
              activeFolder={activeFolder}
              users={users}
              letters={letters}
              itemHeight={itemHeight}
              visilbeRange={visilbeRange}
            />
          ) : (
            <FoldersListStub />
          )}
        </div>
      </div>
    </div>
  );
};

export default LettersList;