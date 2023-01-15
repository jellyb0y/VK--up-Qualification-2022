import { RESET_FILTERS, TOOGLE_ATTACHMENTS_FILTER, TOOGLE_BOOKMARK_FILTER, TOOGLE_READ_FILTER, UPDATE_FILERS } from '../../actions/filters/actions';

import type { ActionTypes } from '@root/data/actions/filters/types';
import type { FiltersState } from './types';

export const getInitialState = (): FiltersState => ({
  bookmarkFilter: false,
  readFilter: false,
  attachmentsFilter: false,
});

export const filters = (state = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case RESET_FILTERS:
      return {
        ...state,
        bookmarkFilter: false,
        readFilter: false,
        attachmentsFilter: false,
      };
    
    case UPDATE_FILERS:
      return {
        ...state,
        ...action.filters,
      };

    case TOOGLE_ATTACHMENTS_FILTER:
      return {
        ...state,
        attachmentsFilter: !state.attachmentsFilter,
      };

    case TOOGLE_BOOKMARK_FILTER:
      return {
        ...state,
        bookmarkFilter: !state.bookmarkFilter,
      };

    case TOOGLE_READ_FILTER:
      return {
        ...state,
        readFilter: !state.readFilter,
      };

    default:
      return state;
  }
};
