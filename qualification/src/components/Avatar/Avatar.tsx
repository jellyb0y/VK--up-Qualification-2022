import { useMemo } from 'react';

import S from './Avatar.scss';

import { useUserAvatar } from '@root/hooks/useUserAvatar';
import { generateColor } from './generateColor';

import type { FC } from 'react';
import type { AvatarProps } from './types';

const Avatar: FC<AvatarProps> = ({
  userId,
  userName,
  stub,
}) => {
  const { data } = useUserAvatar(userId, stub);

  const styles = useMemo(() => (stub || !data ? {
    backgroundColor: generateColor(userName),
  } : {
    backgroundImage: `url(${data})`
  }), [data, stub, userName]);

  return (
    <div
      style={styles}
      className={S.root}
    >
      {stub || !data ? userName[0] : undefined}
    </div>
  )
};

export default Avatar;
