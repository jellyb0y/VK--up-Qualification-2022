import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import Avatar from '@components/Avatar';
import StubComponent from '@components/StubComponent';

import { getDate } from '@utils/getDate';
import { declination } from '@utils/declination';
import { getLetterDocResolver } from '@data/resolvers/letters/getLetterDocResolver';

import S from './Letter.scss';

import type { FC } from 'react';
import type { LetterProps } from './types';
import type { ActionCreator } from '@reduxjs/toolkit';
import type { ThunkActionDispatch } from 'redux-thunk';

const MAX_RECEIPIENTS_COUNT = 3;

const mapDispatchToProps = (dispatch: ThunkActionDispatch<ActionCreator<any>>) => ({
  loadDoc: (id: string) => dispatch(getLetterDocResolver(id)),
});

const Letter: FC<LetterProps> = ({
  letter: {
    id: letterId,
    title,
    author,
    date,
    text,
    hasDoc,
    read,
    doc,
    to,
  },
  users,
  loadDoc,
}) => {
  useEffect(() => {
    if (hasDoc) {
      loadDoc(letterId);
    }
  }, [hasDoc, loadDoc]);

  const { id: authorId, name: authorName, hasAvatar } = users[author];

  const recepientsShort = useMemo(() => to.slice(0, MAX_RECEIPIENTS_COUNT), [to]);

  const recepients = useMemo(() => {
    const recepientsList = recepientsShort.reduce((acc, recepientId) => {
      acc.push(users[recepientId].name);
      return acc;
    }, ['Вы']);

    return `${recepientsList.join(', ')}`;
  }, [recepientsShort, users]);

  const recepientsLast = to.length - recepientsShort.length;

  return (
    <div className={S.root}>
      <div className={S.title}>
        {title}
      </div>
      <div className={S.head}>
        {!read && <div className={S.readMark} />}
        <Avatar stub={!hasAvatar} userName={authorName} userId={authorId} />
        <div className={S.headContent}>
          <div className={S.headMain}>
            {authorName}
            <span className={S.date}>{getDate(date, true)}</span>
          </div>
          <div className={S.recepients}>
            Кому: {recepients}{' '}
            {recepientsLast ? (
              <span className={S.recepientsMore}>
                и еще {recepientsLast} {declination(
                  recepientsLast, ['получатель', 'получателя', 'получателей']
                )}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {hasDoc && (
        doc ? (
          <div className={S.docs}>
            <img className={S.docImage} src={doc.img[0]} />
            <div className={S.docText}>
              1 файл
              <span className={S.docDownload}>
                Скачать <span>(5Mb)</span>
              </span>
            </div>
          </div>
        ) : (
          <div className={S.docs}>
            <StubComponent className={S.docImageStub} />
            <StubComponent className={S.docMetaStub} />
          </div>
        )
      )}
      <div className={S.body}>
        {text}
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Letter);
