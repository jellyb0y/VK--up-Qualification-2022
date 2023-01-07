import SideMenu from './SideMenu';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareFoldersServer } from '@data/preparers/prepareFolders@server';

export default withDataPreparer(SideMenu, [prepareFoldersServer]);
