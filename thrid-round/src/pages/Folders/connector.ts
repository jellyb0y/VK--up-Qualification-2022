import { connect } from 'react-redux';

import Folders from './Folders';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareLettersClient } from '@data/preparers/prepareLetters@client';

import { loadMoreLettersResolver } from '@data/resolvers/letters/loadMoreLettersResolver';

import type { State } from '@data/types';
import type { Letter, ShortLetter } from '@database/types';
import type { ThunkDispatch } from '@data/types/actions';

const mapStateToProps = (state: State) => {
  const activeFolder = state.folders.activeFolder;
  const activeFolderEntity = state.folders.entities[activeFolder];

  const lettersIds = activeFolderEntity?.letters || [];
  const letters = lettersIds.reduce((acc, id) => {
    const letter = state.letters.entities[id];
    acc.push(letter);

    return acc;
  }, [] as (ShortLetter | Letter)[]);

  return {
    hasError: state.folders.hasError,
    isLoading: state.folders.isLoading,
    activeFolder,
    letters,
    totalLetters: activeFolderEntity?.totalLetters || 0,
    users: state.users.entities,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  preloadLetters: (index: number) => dispatch(loadMoreLettersResolver(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDataPreparer(Folders, [
  prepareLettersClient,
]));
