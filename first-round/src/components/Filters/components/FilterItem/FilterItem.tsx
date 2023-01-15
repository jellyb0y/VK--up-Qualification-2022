import classnames from 'classnames';

import CheckMarkIcon from '@assets/images/check_mark.svg';

import S from './FilterItem.scss';

import type { FC } from 'react';
import type { FilterItemProps } from './types';

const FilterItem: FC<FilterItemProps> = ({
  children,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={classnames(S.root, { [S.selected]: isSelected })}
    >
      {isSelected && <CheckMarkIcon className={S.checkIcon} />}
      {children}
    </div>
  )
};

export default FilterItem;
