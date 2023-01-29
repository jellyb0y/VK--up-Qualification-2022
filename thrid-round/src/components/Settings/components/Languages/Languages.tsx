import { useCallback, useState } from 'react';
import classnames from 'classnames';

import Button, { ButtonMode } from '@components/Button';
import RuFlag from '@assets/images/ru_lan.svg';
import EnFlag from '@assets/images/en_lan.svg';

import { useLanguages } from '@lib/Languages/useLanguages';
import { useSetLang } from '@lib/Languages/useSetLang';
import { useLangContext } from '@lib/Languages/useContext';
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect';

import S from './Languages.scss';

import { Languages as LanguagesType } from '@lib/Languages/types';

import type { FC } from 'react';

const Languages: FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguagesType>();

  const { lang } = useLangContext();
  const applyLanguage = useLanguages();
  const setLang = useSetLang();

  useIsomorphicLayoutEffect(() => {
    setSelectedLang(lang);
  }, [lang]);

  const onApply = useCallback(() => {
    if (lang !== selectedLang) {
      setLang(selectedLang);
    }
  }, [selectedLang, lang]);

  return (
    <>
      <div className={S.title}>
        {applyLanguage([
          'Изменить язык',
          'Switch Language',
        ])}
      </div>
      <div
        onClick={() => setSelectedLang(LanguagesType.Ru)}
        className={classnames(S.language, {
          [S.selected]: selectedLang === LanguagesType.Ru
        })}
      >
        <div className={S.point} />
        <RuFlag className={S.flag} />
        Русский
      </div>
      <div
        onClick={() => setSelectedLang(LanguagesType.En)}
        className={classnames(S.language, {
          [S.selected]: selectedLang === LanguagesType.En
        })}
      >
        <div className={S.point} />
        <EnFlag className={S.flag} />
        English
      </div>
      <Button
        mode={ButtonMode.Secondary}
        className={S.button}
        onClick={onApply}
      >
        <span className={S.buttonName}>
          {applyLanguage(['Выбрать язык', 'Switch'])}
        </span>
      </Button>
    </>
  );
};

export default Languages;
