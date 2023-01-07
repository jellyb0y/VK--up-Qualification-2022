import Letter from './Letter';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareLetterClient } from '@data/preparers/prepareLetter@client';

export default withDataPreparer(Letter, [
  prepareLetterClient,
]);
