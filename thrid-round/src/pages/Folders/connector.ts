import { connect } from 'react-redux';

import Folders from './Folders';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareLettersClient } from '@data/preparers/prepareLetters@client';

import { loadMoreLettersResolver } from '@data/resolvers/letters/loadMoreLettersResolver';

import type { State } from '@data/types';
import type { Letter, ShortLetter } from '@database/types';
import type { ThunkActionDispatch } from 'redux-thunk';
import type { ActionCreator } from '@reduxjs/toolkit';

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

const mapDispatchToProps = (dispatch: ThunkActionDispatch<ActionCreator<any>>) => ({
  preloadLetters: (index: number) => dispatch(loadMoreLettersResolver(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDataPreparer(Folders, [
  prepareLettersClient,
]));
