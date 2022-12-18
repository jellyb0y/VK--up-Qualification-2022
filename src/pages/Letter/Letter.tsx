import { connect } from 'react-redux';

import Letter from '@components/Letter';

import type { FC } from 'react';
import type { LetterProps } from './types';
import type { State } from '@data/types';

const mapStateToProps = (state: State) => {
  const activeLetter = state.letters.activeLetter;

  return {
    isLoading: state.letters.isLoading,
    letter: state.letters.entities[activeLetter],
    users: state.users.entities,
  };
};

const LetterContainer: FC<LetterProps> = ({
  letter,
  users,
  isLoading,
}) => {
  if (!letter || isLoading) {
    return null;
  }

  return <Letter letter={letter} users={users} />
};

export default connect(mapStateToProps)(LetterContainer);
