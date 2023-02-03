import { connect } from 'react-redux';
import { useCallback } from 'react';
import classnames from 'classnames';

import FilterItem from './components/FilterItem/FilterItem';
import SelectedBookmarkIcon from '@assets/images/bookmark_selected.svg';
import AttachIcon from '@assets/images/attach.svg';

import { updateFiltersResolver } from '@data/resolvers/filters/updateFiltersResolver';
import { useLanguages } from '@lib/Languages/useLanguages';
import { useOverlay } from '@hooks/useOverlay';

import {
  resetFiltersAction,
  toogleAttachmentsFilterAction,
  toogleBookmarkFilterAction,
  toogleNewestSortAction,
  toogleOldestSortAction,
  toogleReadFilterAction,
} from '@data/actions/filters';

import { SortType } from '@data/reducers/filters';

import S from './Filters.scss';

import type { FC } from 'react';
import type { FiltersProps } from './types';
import type { State } from '@data/types';
import type { ThunkDispatch } from '@data/types/actions';

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  resetFilters: () => dispatch(updateFiltersResolver(resetFiltersAction)),
  toogleBookmarkFilter: () => dispatch(updateFiltersResolver(toogleBookmarkFilterAction)),
  toogleReadFilter: () => dispatch(updateFiltersResolver(toogleReadFilterAction)),
  toogleAttachmentsFilter: () => dispatch(updateFiltersResolver(toogleAttachmentsFilterAction)),
  toogleNewestSort: () => dispatch(updateFiltersResolver(toogleNewestSortAction)),
  toogleOldestSort: () => dispatch(updateFiltersResolver(toogleOldestSortAction)),
});

const mapStateToProps = (state: State) => ({
  filters: state.filters,
});

const Filters: FC<FiltersProps> = ({
  filters,
  className,
  onClose,
  resetFilters,
  toogleAttachmentsFilter,
  toogleBookmarkFilter,
  toogleReadFilter,
  toogleNewestSort,
  toogleOldestSort,
}) => {
  const containerRef = useOverlay<HTMLDivElement>({ onClose });
  const applyLanguage = useLanguages();

  const createToogleHandler = useCallback((func: () => void) => (
    () => {
      func();
      onClose();
    }
  ), []);

  const rootCn = classnames(S.root, className);

  const isFiltersEmpty = (
    !filters.attachmentsFilter &&
    !filters.bookmarkFilter && 
    !filters.readFilter
  )

  return (
    <div ref={containerRef} className={rootCn}>
      <FilterItem
        onClick={createToogleHandler(resetFilters)}
        isSelected={isFiltersEmpty}
      >
        {applyLanguage(['Все письма', 'All messages'])}
      </FilterItem>
      <FilterItem
        onClick={createToogleHandler(toogleReadFilter)}
        isSelected={filters.readFilter}
      >
        <div className={S.iconContainer}>
          <div className={S.readMarkContainer}>
            <div className={S.readMark} />
          </div>
        </div>
        {applyLanguage(['Непрочитанные', 'Unread'])}
      </FilterItem>
      <FilterItem
        onClick={createToogleHandler(toogleBookmarkFilter)}
        isSelected={filters.bookmarkFilter}
      >
        <div className={S.iconContainer}>
          <SelectedBookmarkIcon className={S.bookmarkIcon} />
        </div>
        {applyLanguage(['С флажком', 'Flagged'])}
      </FilterItem>
      <FilterItem
        onClick={createToogleHandler(toogleAttachmentsFilter)}
        isSelected={filters.attachmentsFilter}
      >
        <div className={S.iconContainer}>
          <AttachIcon className={S.attachIcon} />
        </div>
        {applyLanguage(['С вложениями', 'With attachments'])}
      </FilterItem>
      <div className={S.separator} />
      <FilterItem
        onClick={createToogleHandler(toogleNewestSort)}
        isSelected={filters.sortType === SortType.NewestFirst}
      >
        {applyLanguage(['Сначала новые', 'Newest on top'])}
      </FilterItem>
      <FilterItem
        onClick={createToogleHandler(toogleOldestSort)}
        isSelected={filters.sortType === SortType.OldestFirst}
      >
        {applyLanguage(['Сначала старые', 'Oldest on top'])}
      </FilterItem>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
