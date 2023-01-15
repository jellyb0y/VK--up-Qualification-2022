import Header from './Header';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareFiltersClient } from '@data/preparers/prepareFilters@client';

export default withDataPreparer(Header, [prepareFiltersClient]);
