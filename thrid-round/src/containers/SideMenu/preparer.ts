import SideMenu from './SideMenu';
import { withDataPreparer } from '@lib/DataPreparer/withDataPreparer';
import { prepareFoldersClient } from '@data/preparers/prepareFolders@client';
import { prepareFolderChange } from '@data/preparers/prepareFolderChange@client';

export default withDataPreparer(SideMenu, [
  prepareFoldersClient,
  prepareFolderChange,
]);
