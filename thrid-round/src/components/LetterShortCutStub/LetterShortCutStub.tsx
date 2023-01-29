import S from './LetterShortCutStub.scss';

import StubComponent from '@components/StubComponent';

import type { FC } from 'react';

const LetterShortCutStub: FC = () => {
  return (
    <div className={S.root}>
      <StubComponent className={S.avatar} />
      <StubComponent className={S.content} />
    </div>
  );
};

export default LetterShortCutStub;
