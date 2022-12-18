import Folders from './Folders';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareLettersServer } from '@data/preparers/prepareLetters@server';
import { prepareLettersClient } from '@data/preparers/prepareLetters@client';

export default withDataPreparer(Folders, [
  prepareLettersServer,
  prepareLettersClient,
]);
