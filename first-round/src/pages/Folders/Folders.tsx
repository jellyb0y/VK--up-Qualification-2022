import { connect } from 'react-redux';

import LetterComponent from '@components/LetterShortCut';
import FoldersListStub from '@components/FoldersListStub';
import EmptyFolder from '@components/EmptyFolder';

import { applyFilters } from './applyFilters';
import { applySort } from './applySort';

import S from './Folders.scss';

import type { FC } from 'react';
import type { FoldersProps } from './types';
import type { State } from '@data/types';
import type { Letter, ShortLetter } from '@database/types';

const mapStateToProps = (state: State) => {
  const activeFolder = state.folders.activeFolder;
  const lettersIds = state.folders.entities[activeFolder]?.letters || [];
  const letters = lettersIds.reduce((acc, id) => {
    const letter = state.letters.entities[id];
    acc.push(letter);

    return acc;
  }, [] as (ShortLetter | Letter)[]);

  const filters = state.filters;
  const filteredLetters = applyFilters(filters, letters);
  const sortedLetters = applySort(filters.sortType, filteredLetters);

  return {
    hasError: state.folders.hasError,
    isLoading: state.folders.isLoading,
    activeFolder,
    letters: sortedLetters,
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
  if (!isLoading && (hasError || !letters.length)) {
    return <EmptyFolder />;
  }

  return (
    <div className={S.root}>
      {!isLoading || letters.length ? (
        letters.map((letter) => (
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
