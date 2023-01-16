import { useLanguages } from '@lib/Languages/useLanguages';

import S from './EmptyFolder.scss';

import type { FC } from 'react';

const EmptyFolder: FC = () => {
  const applyLanguage = useLanguages();
  return (
    <div className={S.root}>
      <div className={S.center}>
        <div className={S.image} />
        {applyLanguage(['Писем нет', 'Nothing here'])}
      </div>
    </div>
  );
};

export default EmptyFolder;
