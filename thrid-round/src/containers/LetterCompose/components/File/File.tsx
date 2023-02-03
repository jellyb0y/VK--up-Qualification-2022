import classNames from 'classnames';

import CloseIcon from '@assets/images/close.svg';
import FileIcon from '@assets/images/file.svg';

import S from './File.scss';

import type { FileProps } from './types';
import type { FC } from 'react';

const File: FC<FileProps> = ({
  file,
  onRemove,
  className,
}) => {
  const rootCn = classNames(S.root, className);

  return (
    <div className={rootCn}>
      <CloseIcon
        onClick={onRemove}
        className={S.closeButton}
      />
      <FileIcon className={S.fileIcon} />
      <span className={S.fileName}>
        {file.name}
      </span>
    </div>
  );
};

export default File;
