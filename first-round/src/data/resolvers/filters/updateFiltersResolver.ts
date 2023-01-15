import { AVAILABLE_FILTES } from '@data/reducers/filters/constants';
import { State } from '@data/types';

import type { BaseAction } from '@data/types/actions';
import type { Dispatch } from '@reduxjs/toolkit';

export const updateFiltersResolver = (action: () => BaseAction<any>) => {
  return (dispatch: Dispatch, getState: () => State) => { 
    const urlParams = new URLSearchParams(window.location.search);
   
    dispatch(action());

    const { filters } = getState();

    Object.entries(AVAILABLE_FILTES).forEach(([key, filtersKey]) => {
      if (filters[filtersKey]) {
        urlParams.set(key, '1');
      } else {
        urlParams.delete(key)
      }
    });

    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + urlParams.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
};
