import { Link, useMatch } from 'react-router-dom';

import LogoLight from '@assets/images/logo.svg';
import LogoDark from '@assets/images/logo_dark.svg';
import BackArrow from '@assets/images/back_arrow.svg';
import Button from '@components/Button';

import * as Routes from '@app/routes';

import S from './Header.scss';

import type { FC } from 'react';

const Header: FC = () => {
  const isLetterPage = !!useMatch(Routes.LETTER_PATH);

  const goBack = () => history.back();

  return (
    <div className={S.root}>
      {isLetterPage ? (
        <Button onClick={goBack} className={S.backButton}>
          <BackArrow className={S.backButtonArrow} />
          <span className={S.backButtonText}>Вернуться</span>
        </Button>
      ) : (
        <Link to={Routes.ROOT_PATH}>
          <LogoLight className={S.logoLight} />
          <LogoDark className={S.logoDark} />
        </Link>
      )}
    </div>
  );
};

export default Header;
