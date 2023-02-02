import classnames from 'classnames';

import Avatar from '@components/Avatar';

import CloseIcon from '@assets/images/close_small.svg';

import S from './Address.scss';

import type { FC } from 'react';
import type { AddressProps } from './types';

const Address: FC<AddressProps> = ({
  className,
  email,
  onRemove,
}) => {
  const rootCn = classnames(S.root, className);

  return (
    <div className={rootCn}>
      <Avatar userId='' userName={email} className={S.avatar} />
      <div className={S.label}>{email}</div>
      <CloseIcon className={S.closeButton} onClick={onRemove} />
    </div>
  );
};

export default Address;
