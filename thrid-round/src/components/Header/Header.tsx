import classnames from 'classnames';
import { connect } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react'; 
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';

import ReadIcon from '@assets/images/read.svg';
import SelectedBookmarkIcon from '@assets/images/bookmark_selected.svg';
import AttachIcon from '@assets/images/attach.svg';
import LogoLight from '@assets/images/logo.svg';
import LogoDark from '@assets/images/logo_dark.svg';
import BackArrow from '@assets/images/back_arrow.svg';
import ArrowBottom from '@assets/images/arrow_bottom.svg';
import Button from '@components/Button';
import Filters from '@components/Filters';

import { getFolderUrl } from '@utils/getFolderUrl';
import { useLanguages } from '@lib/Languages/useLanguages';
import { IGNORE_ATTRIBUTES } from '@hooks/useOverlay';

import * as Routes from '@app/routes';

import S from './Header.scss';

import type { FC } from 'react';
import type { State } from '@data/types';
import type { FiltersProps } from '@components/Filters/types';

const mapStateToProps = (state: State) => ({
  filters: state.filters,
});

const Header: FC<FiltersProps> = ({
  filters,
}) => {
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  const isLetterPage = !!useMatch(Routes.LETTER_PATH);
  const { folder } = useParams<{ folder?: string }>();
  const navigator = useNavigate();
  const applyLanguage = useLanguages();

  useEffect(() => {
    if (isLetterPage) {
      setFiltersOpen(false);
    }
  }, [isLetterPage]);

  const goBack = useCallback(() => {
    if (folder) {
      navigator(getFolderUrl(folder));
    } else {
      history.back();
    }
  }, [folder]);

  const toogleFilters = () => setFiltersOpen((isOpen) => !isOpen);

  const onFiltersClose = () => {
    setFiltersOpen(false);
  };

  const activeFilterIcons = (
    <div className={S.activeFilters}>
      {[
        filters.readFilter && ReadIcon,
        filters.bookmarkFilter && SelectedBookmarkIcon,
        filters.attachmentsFilter && AttachIcon,
      ].map((Icon, index) => Icon && (
          <Icon key={index} />
      ))}
    </div>
  );

  const activeFiltersName = useMemo(() => {
    const filtersList = [
      filters.readFilter && applyLanguage(['Непрочитанные', 'Unread']),
      filters.bookmarkFilter && applyLanguage(['С флажком', 'Flagged']),
      filters.attachmentsFilter && applyLanguage(['С вложениями', 'With attachments']),
    ].filter(Boolean);

    if (filtersList.length === 1) {
      return filtersList[0];
    }

    return applyLanguage(['Фильтр', 'Filter']);
  }, [filters, applyLanguage]);

  const filterArrowCn = classnames(S.filterArrow, {
    [S.filterArrowReverted]: isFiltersOpen,
  });

  return (
    <div className={S.root}>
      {isLetterPage ? (
        <Button onClick={goBack} className={S.backButton}>
          <BackArrow className={S.backButtonArrow} />
          <span className={S.backButtonText}>
            {applyLanguage(['Вернуться', 'Return'])}
          </span>
        </Button>
      ) : (
        <Link to={Routes.ROOT_PATH}>
          <LogoLight className={S.logoLight} />
          <LogoDark className={S.logoDark} />
        </Link>
      )}
      {!isLetterPage && (
        <Button
          {...(isFiltersOpen
            ? IGNORE_ATTRIBUTES
            : null
          )}
          onClick={toogleFilters}
          className={S.filters}
        >
          {activeFilterIcons}
          {activeFiltersName}
          <ArrowBottom className={filterArrowCn} />
        </Button>
      )}
      {isFiltersOpen && (
        <Filters
          className={S.filtersContainer}
          onClose={onFiltersClose}
        />
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Header);
