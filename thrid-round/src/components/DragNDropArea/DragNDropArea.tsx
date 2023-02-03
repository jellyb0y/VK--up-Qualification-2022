import classnames from 'classnames';

import { DragObserverType, useDragNDrop } from '@hooks/useDragNDrop';

import S from './DragNDropArea.scss';

import type { FC } from 'react';
import type { DragNDropAreaProps } from './types';

const DragNDropArea: FC<DragNDropAreaProps> = ({
  className,
  onDragClassName,
  onDropFile,
  children,
}) => {
  const { isDrag, containerRef } = useDragNDrop<HTMLDivElement>(DragObserverType.File, onDropFile);

  const rootCn = classnames(S.root, className, {
    [onDragClassName]: isDrag,
    [S.onDrag]: isDrag,
  });

  return (
    <div
      ref={containerRef}
      className={rootCn}
    >
      {isDrag && children}
    </div>
  );
};

export default DragNDropArea;
