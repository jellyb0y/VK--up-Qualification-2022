import S from './LetterStub.scss';

import StubComponent from '@components/StubComponent';

import type { FC } from 'react';
import type { LetterStubProps } from './types';

const LetterStub: FC<LetterStubProps> = ({ hasAttach }) => {
  return (
    <div className={S.root}>
      <StubComponent className={S.title} />
      <div className={S.head}>
        <StubComponent className={S.avatar} />
        <StubComponent className={S.headContent} />
      </div>
      {hasAttach && (
        <div className={S.attach}>
          <StubComponent className={S.photo} />
          <StubComponent className={S.photoMeta} />
        </div>
      )}
      <StubComponent className={S.content} />
    </div>
  );
};

export default LetterStub;
