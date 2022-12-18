import classnames from 'classnames';

import S from './StubComponent.scss';

import type { FC } from 'react';
import type { StubComponentProps } from './types';

const StubComponent: FC<StubComponentProps> = ({
  className,
}) => {
  return (
    <div className={classnames(S.root, className)}>
      <span className={S.flare} />
    </div>
  );
};

export default StubComponent;
