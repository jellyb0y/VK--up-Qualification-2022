import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import Avatar from '@components/Avatar';
import Category from '@components/Category';
import StubComponent from '@components/StubComponent';
import ImportantIcon from '@assets/images/important.svg';

import { getDate } from '@utils/getDate';
import { declination } from '@utils/declination';
import { getLetterDocResolver } from '@data/resolvers/letters/getLetterDocResolver';
import { useLanguages } from '@lib/Languages/useLanguages';
import { useLangContext } from '@lib/Languages/useContext';

import S from './Letter.scss';

import type { FC } from 'react';
import type { LetterProps } from './types';
import type { ThunkDispatch } from '@data/types/actions';

const MAX_RECEIPIENTS_COUNT = 3;

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
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
    important,
    category,
  },
  users,
  loadDoc,
}) => {
  const applyLanguage = useLanguages();
  const { lang } = useLangContext();

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
    }, [applyLanguage(['Вы', 'You'])]);

    return `${recepientsList.join(', ')}`;
  }, [recepientsShort, users]);

  const recepientsLast = to.length - recepientsShort.length;

  const recepientsText = applyLanguage([
    declination(recepientsLast, ['получатель', 'получателя', 'получателей']),
    declination(recepientsLast, ['more recipient', 'more recipients', 'more recipients']),
  ]);

  return (
    <div className={S.root}>
      <div className={S.title}>
        {title}
        {category && (
          <Category
            className={S.category}
            category={category}
            withName
          />
        )}
      </div>
      <div className={S.head}>
        {!read && <div className={S.readMark} />}
        <Avatar stub={!hasAvatar} userName={authorName} userId={authorId} />
        <div className={S.headContent}>
          <div className={S.headMain}>
            {authorName}
            <span className={S.date}>{getDate(date, true, lang)}</span>
            {important && <ImportantIcon className={S.importantIcon} />}
          </div>
          <div className={S.recepients}>
            {applyLanguage(['Кому:', 'To:'])}
            {' '}{recepients}{' '}
            {recepientsLast ? (
              <span className={S.recepientsMore}>
                {applyLanguage(['и еще', 'and'])}
                {' '}{recepientsLast}{' '}
                {recepientsText}
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
              1 {applyLanguage(['файл', 'file'])}
              <span className={S.docDownload}>
                {applyLanguage(['Скачать', 'Download'])}
                {' '}<span>(5Mb)</span>
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
      <div
        className={S.body}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Letter);
