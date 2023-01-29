import LettersList from '@components/LettersList';
import EmptyFolder from '@components/EmptyFolder';

import type { FC } from 'react';
import type { FoldersProps } from './types';

const Folders: FC<FoldersProps> = (props) => {
  const {
    letters,
    hasError,
    isLoading,
    activeFolder,
  } = props;

  if (!isLoading && (hasError || !letters.length)) {
    return <EmptyFolder />;
  }

  return <LettersList key={activeFolder} {...props} />;
};

export default Folders;
