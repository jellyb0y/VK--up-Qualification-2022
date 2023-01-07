import SideMenu from './SideMenu';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareFoldersServer } from '@data/preparers/prepareFolders@client';

export default withDataPreparer(SideMenu, [prepareFoldersServer]);
