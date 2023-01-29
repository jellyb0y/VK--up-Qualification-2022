import { connect } from 'react-redux';

import Letter from '@components/Letter';
import LetterStub from '@components/LetterStub';

import type { FC } from 'react';
import type { LetterProps } from './types';
import type { State } from '@data/types';

const mapStateToProps = (state: State) => {
  const activeLetter = state.letters.activeLetter;

  return {
    hasError: state.letters.hasError,
    isLoading: state.letters.isLoading,
    letter: state.letters.entities[activeLetter],
    users: state.users.entities,
  };
};

const LetterContainer: FC<LetterProps> = ({
  letter,
  users,
  hasError,
  isLoading,
}) => {
  if (!letter || isLoading || hasError || letter?.type === 'short') {
    return (
      <LetterStub hasAttach={letter?.hasDoc} />
    );
  }

  return <Letter letter={letter} users={users} />
};

export default connect(mapStateToProps)(LetterContainer);
