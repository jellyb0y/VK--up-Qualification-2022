import Letter from './Letter';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareLetterServer } from '@data/preparers/prepareLetter@server';
import { prepareLetterClient } from '@data/preparers/prepareLetter@client';

export default withDataPreparer(Letter, [
  prepareLetterServer,
  prepareLetterClient,
]);
