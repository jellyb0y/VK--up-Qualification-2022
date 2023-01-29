import type { FiltersState } from '@data/reducers/filters';
import type { BaseAction } from '@data/types/actions';

export type ResetFiltersAction = BaseAction<'@filters/RESET_FILTERS'>;

export type ToogleBookmarkFilterAction = BaseAction<'@filters/TOOGLE_BOOKMARK_FILTER'>;

export type ToogleAttachmentsFilterAction = BaseAction<'@filters/TOOGLE_ATTACHMENTS_FILTER'>;

export type ToogleReadFilterAction = BaseAction<'@filters/TOOGLE_READ_FILTER'>;

export type ToogleNewestSortAction = BaseAction<'@filters/TOOGLE_NEWEST_SORT'>;

export type ToogleOldestSortAction = BaseAction<'@filters/TOOGLE_OLDEST_SORT'>;

export interface UpdateFiltersAction extends BaseAction<'@filters/UPDATE_FILERS'> {
  filters: Partial<FiltersState>;
}

export type ActionTypes =
  | ResetFiltersAction
  | ToogleBookmarkFilterAction
  | ToogleAttachmentsFilterAction
  | ToogleReadFilterAction
  | ToogleNewestSortAction
  | ToogleOldestSortAction
  | UpdateFiltersAction;
