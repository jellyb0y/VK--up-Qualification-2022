import { connect } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';

import FilterItem from './components/FilterItem/FilterItem';
import SelectedBookmarkIcon from '@assets/images/bookmark_selected.svg';
import AttachIcon from '@assets/images/attach.svg';

import { updateFiltersResolver } from '@data/resolvers/filters/updateFiltersResolver';
import { useLanguages } from '@lib/Languages/useLanguages';

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
import type { ActionCreator } from '@reduxjs/toolkit';
import type { ThunkActionDispatch } from 'redux-thunk';

const mapDispatchToProps = (dispatch: ThunkActionDispatch<ActionCreator<any>>) => ({
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
  const containerRef = useRef<HTMLDivElement>();
  const applyLanguage = useLanguages();

  const handleClick = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    if (!containerRef.current.contains(target)) {
      onClose?.();
    }
  }, []);

  const createToogleHandler = useCallback((func: () => void) => (
    () => {
      func();
      onClose();
    }
  ), []);
  
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    window.addEventListener('click', handleClick, true);
    
    return () => {
      window.removeEventListener('click', handleClick, true);
    };
  }, [containerRef.current, handleClick]);

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
