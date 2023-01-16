import { useCallback, useMemo, useState } from 'react';
import { Context } from './context';

import { Languages, LanguagesProviderProps } from './types';

import type { FC } from 'react';
import { setSelectedTheme } from './setSelectedLanguage';

export const LanguagesProvider: FC<LanguagesProviderProps> = ({
  lang: selectedLang = Languages.Ru,
  children,
}) => {
  const [lang, setLang] = useState<Languages>(selectedLang);

  const setLanguage = useCallback((lang: Languages) => {
    setLang(lang);
    setSelectedTheme(lang);
  }, []);

  const context = useMemo(() => ({
    lang: lang || Languages.Ru,
    setLang: setLanguage,
  }), [lang, setLanguage]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};
