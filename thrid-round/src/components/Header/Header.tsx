import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react'; 
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';

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

const Header: FC = () => {
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
          {applyLanguage(['Фильтр', 'Filter'])}
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

export default Header;
