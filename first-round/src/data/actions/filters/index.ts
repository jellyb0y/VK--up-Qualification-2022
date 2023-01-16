import type {
  ResetFiltersAction,
  ToogleAttachmentsFilterAction,
  ToogleBookmarkFilterAction,
  ToogleNewestSortAction,
  ToogleOldestSortAction,
  ToogleReadFilterAction,
  UpdateFiltersAction,
} from './types';

import {
  RESET_FILTERS,
  TOOGLE_ATTACHMENTS_FILTER,
  TOOGLE_BOOKMARK_FILTER,
  TOOGLE_NEWEST_SORT,
  TOOGLE_OLDEST_SORT,
  TOOGLE_READ_FILTER,
  UPDATE_FILERS,
} from './actions';

import type { FiltersState } from '@data/reducers/filters';

export const resetFiltersAction = (): ResetFiltersAction => ({
  type: RESET_FILTERS,
});

export const updateFiltersAction = (filters: Partial<FiltersState>): UpdateFiltersAction => ({
  type: UPDATE_FILERS,
  filters,
});

export const toogleBookmarkFilterAction = (): ToogleBookmarkFilterAction => ({
  type: TOOGLE_BOOKMARK_FILTER,
});

export const toogleAttachmentsFilterAction = (): ToogleAttachmentsFilterAction => ({
  type: TOOGLE_ATTACHMENTS_FILTER,
});

export const toogleReadFilterAction = (): ToogleReadFilterAction => ({
  type: TOOGLE_READ_FILTER,
});

export const toogleNewestSortAction = (): ToogleNewestSortAction => ({
  type: TOOGLE_NEWEST_SORT,
});

export const toogleOldestSortAction = (): ToogleOldestSortAction => ({
  type: TOOGLE_OLDEST_SORT,
});
