import S from './LetterStub.scss';

import StubComponent from '@components/StubComponent';

import type { FC } from 'react';

const LetterStub: FC = () => {
  return (
    <div className={S.root}>
      <StubComponent className={S.title} />
      <div className={S.head}>
        <StubComponent className={S.avatar} />
        <StubComponent className={S.headContent} />
      </div>
      <StubComponent className={S.content} />
    </div>
  );
};

export default LetterStub;
