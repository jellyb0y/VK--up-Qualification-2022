import Folders from './Folders';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareLettersClient } from '@data/preparers/prepareLetters@client';

export default withDataPreparer(Folders, [
  prepareLettersClient,
]);
