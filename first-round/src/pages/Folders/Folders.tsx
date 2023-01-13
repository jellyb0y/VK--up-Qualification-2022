import { connect } from 'react-redux';

import LetterComponent from '@components/LetterShortCut';
import FoldersListStub from '@components/FoldersListStub';

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
    hasError: state.folders.hasError,
    isLoading: state.folders.isLoading,
    activeFolder,
    letters,
    users: state.users.entities,
  };
};

const Folders: FC<FoldersProps> = ({
  activeFolder,
  letters,
  users,
  hasError,
  isLoading,
}) => {
  const sortedLetters = letters.sort(({ date: dateA }, { date: dateB }) => (
    new Date(dateB).getTime() - new Date(dateA).getTime()
  ));

  const isListReady = (
    sortedLetters.length &&
    !hasError &&
    !isLoading
  );

  return (
    <div className={S.root}>
      {isListReady ? (
        sortedLetters.map((letter) => (
          <LetterComponent
            key={letter.id}
            authorUser={users[letter.author]}
            folder={activeFolder}
            {...letter}
          />
        ))
      ) : (
        <FoldersListStub />
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Folders);
