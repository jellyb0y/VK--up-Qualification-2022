import { useContext } from 'react';
import { Context } from './context';

export const useThemes = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('You\'re trying to use themes without ThemeProvider')
  }

  return context;
};
