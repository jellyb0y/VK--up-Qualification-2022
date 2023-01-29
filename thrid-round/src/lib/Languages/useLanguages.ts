import { useContext } from 'react';
import { Context } from './context';

import { LangTuple, Languages } from './types';

export const useLanguages = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('You\'re trying to use themes without LanguageProvider')
  }

  return (tuple: LangTuple) => {
    const [ruWord, enWord] = tuple;

    return context.lang === Languages.Ru
      ? ruWord
      : enWord;
  };
};
