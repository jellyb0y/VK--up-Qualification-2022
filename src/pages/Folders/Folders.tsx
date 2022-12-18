import { connect } from 'react-redux';

import LetterComponent from '@components/LetterShortCut';

import S from './Folders.scss';

import type { FC } from 'react';
import type { FoldersProps } from './types';
import type { State } from '@data/types';
import type { ShortLetter } from '@database/types';

const mapStateToProps = (state: State) => {
  const activeFolder = state.folders.activeFolder;
  const lettersIds = state.folders.entities[activeFolder]?.letters || [];
  const letters = lettersIds.reduce((acc, id) => {
    if (state.letters.entities[id]) {
      acc.push(state.letters.entities[id]);
    }

    return acc;
  }, [] as ShortLetter[]);

  return {
    activeFolder,
    letters,
    users: state.users.entities,
  };
};

const Folders: FC<FoldersProps> = ({
  activeFolder,
  letters,
  users,
}) => {
  const sortedLetters = letters.sort(({ date: dateA }, { date: dateB }) => (
    new Date(dateB).getTime() - new Date(dateA).getTime()
  ));

  return (
    <div className={S.root}>
      {sortedLetters.map((letter) => (
        <LetterComponent
          key={letter.id}
          authorUser={users[letter.author]}
          folder={activeFolder}
          {...letter}
        />
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(Folders);
