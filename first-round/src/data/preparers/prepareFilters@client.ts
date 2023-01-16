import { updateFiltersAction } from '@data/actions/filters';
import { FiltersState, SortType } from '@data/reducers/filters';
import { AVAILABLE_FILTES, SORT_TYPE_CGI } from '@data/reducers/filters/constants';
import { createPreparer } from '@lib/DataPreparer/createPreparer';

import { Side } from '@lib/DataPreparer/types';

export const prepareFiltersClient = createPreparer((dispatch) => {
  const filters: Partial<FiltersState> = {};
  const urlParams = new URLSearchParams(window.location.search);

  Object.entries(AVAILABLE_FILTES).forEach(([key, filtersKey]) => {
    const paramValue = urlParams.get(key);
    filters[filtersKey] = !!paramValue;
  });

  const sortType = urlParams.get(SORT_TYPE_CGI);
  if (sortType) {
    filters.sortType = sortType as SortType;
  }

  dispatch(updateFiltersAction(filters));
}, {
  side: Side.Client,
});
