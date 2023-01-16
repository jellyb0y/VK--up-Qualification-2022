import { useContext } from 'react';
import { Context } from './context';

export const useSetLang = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('You\'re trying to use themes without LanguageProvider')
  }

  return context.setLang;
};
