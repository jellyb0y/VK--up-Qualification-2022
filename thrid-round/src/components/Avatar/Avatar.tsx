import { useMemo } from 'react';
import classnames from 'classnames';

import S from './Avatar.scss';

import { useUserAvatar } from '@root/hooks/useUserAvatar';
import { generateColor } from './generateColor';

import type { FC } from 'react';
import type { AvatarProps } from './types';

const Avatar: FC<AvatarProps> = ({
  userId,
  userName,
  stub,
  className,
}) => {
  const data = useUserAvatar(userId, stub);

  const styles = useMemo(() => (stub || !data ? {
    backgroundColor: generateColor(userName),
  } : {
    backgroundImage: `url(${data})`
  }), [data, stub, userName]);

  return (
    <div
      style={styles}
      className={classnames(S.root, className)}
    >
      {stub || !data ? userName[0].toUpperCase() : undefined}
    </div>
  )
};

export default Avatar;
