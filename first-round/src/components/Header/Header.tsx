import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';

import LogoLight from '@assets/images/logo.svg';
import LogoDark from '@assets/images/logo_dark.svg';
import BackArrow from '@assets/images/back_arrow.svg';
import Button from '@components/Button';

import * as Routes from '@app/routes';

import S from './Header.scss';

import { FC, useCallback } from 'react';
import { getFolderUrl } from '@utils/getFolderUrl';

const Header: FC = () => {
  const isLetterPage = !!useMatch(Routes.LETTER_PATH);
  const { folder } = useParams<{ folder?: string }>();
  const navigator = useNavigate();

  const goBack = useCallback(() => {
    if (folder) {
      navigator(getFolderUrl(folder));
    } else {
      history.back();
    }
  }, [folder]);

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
