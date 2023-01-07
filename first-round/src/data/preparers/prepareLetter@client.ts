import { useParams } from 'react-router';

import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';

import { getLetterResolver } from '@data/resolvers/letters/getLetterResolver';

export const prepareLetterClient = createPreparer((dispatch, getState) => {
  const { id } = useParams<{ id: string }>();
  const { letters: { activeLetter } } = getState();

  if (activeLetter === id) {
    return;
  }

  dispatch(getLetterResolver(id));
}, {
  side: Side.Client,
  every: true,
});
