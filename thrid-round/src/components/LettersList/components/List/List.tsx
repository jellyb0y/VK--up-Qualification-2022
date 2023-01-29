import { useEffect, useState } from 'react';

import LetterComponent from '@components/LetterShortCut';
import LetterShortCutStub from '@components/LetterShortCutStub';

import type { ListProps } from './types';
import type { FC } from 'react';

const List: FC<ListProps> = ({
  letters,
  visilbeRange,
  itemHeight,
  users,
  activeFolder,
}) => {
  const [visibleFrom, visibleTo] = visilbeRange || [0, letters.length]

  const spaceBefore = visibleFrom * itemHeight;
  const spaceAfter = itemHeight * (
    letters.length > visibleTo
      ? letters.length - visibleTo - 1
      : 0
  );

  const items = letters.slice(visibleFrom, visibleTo);

  return (
    <>
      <div
        key="topStub"
        data-virtual-list="ignore"
        style={{ height: spaceBefore }}
      />
      {items.map((letter, index) => letter ? (
        <LetterComponent
          key={letter.id}
          authorUser={users[letter.author]}
          folder={activeFolder}
          {...letter}
        />
      ) : (
        <LetterShortCutStub key={index} />
      ))}
      <div
        key="bottomStub"
        data-virtual-list="ignore"
        style={{ height: spaceAfter }}
      />
    </>
  )
};

export default List;
