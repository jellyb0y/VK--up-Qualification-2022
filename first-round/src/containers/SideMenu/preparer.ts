import SideMenu from './SideMenu';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareFoldersClient } from '@data/preparers/prepareFolders@client';

export default withDataPreparer(SideMenu, [prepareFoldersClient]);
