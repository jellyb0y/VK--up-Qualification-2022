import { updateFoldersAction } from '@data/actions/folders';
import { getFolders } from '@data/resourses/folders/getFolders';

import type { Dispatch } from '@reduxjs/toolkit';

export const getFoldersResolver = () => {
  return (dispatch: Dispatch) => {    
    getFolders().then((folders) => {
      dispatch(updateFoldersAction(folders));
    });
  };
};
