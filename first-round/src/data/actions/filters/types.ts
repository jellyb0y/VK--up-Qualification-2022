import type { FiltersState } from '@data/reducers/filters';
import type { BaseAction } from '@data/types/actions';

export type ResetFiltersAction = BaseAction<'RESET_FILTERS'>;

export type ToogleBookmarkFilterAction = BaseAction<'TOOGLE_BOOKMARK_FILTER'>;

export type ToogleAttachmentsFilterAction = BaseAction<'TOOGLE_ATTACHMENTS_FILTER'>;

export type ToogleReadFilterAction = BaseAction<'TOOGLE_READ_FILTER'>;

export interface UpdateFiltersAction extends BaseAction<'UPDATE_FILERS'> {
  filters: Partial<FiltersState>;
}

export type ActionTypes =
  | ResetFiltersAction
  | ToogleBookmarkFilterAction
  | ToogleAttachmentsFilterAction
  | ToogleReadFilterAction
  | UpdateFiltersAction;
