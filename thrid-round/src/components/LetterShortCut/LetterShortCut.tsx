import classnames from 'classnames';

import Avatar from '@components/Avatar';
import BookmarkIcon from '@assets/images/bookmark.svg';
import SelectedBookmarkIcon from '@assets/images/bookmark_selected.svg';
import ImportantIcon from '@assets/images/important.svg';
import AttachIcon from '@assets/images/attach.svg';
import Category from '@components/Category';
import { Link } from 'react-router-dom';

import { getDate } from '@utils/getDate';
import { getLetterUrl } from '@utils/getLetterUrl';
import { useLangContext } from '@lib/Languages/useContext';

import S from './LetterShortCut.scss';

import type { FC, MouseEventHandler } from 'react';
import type { LetterShortCutProps } from './types';

const LetterShortCut: FC<LetterShortCutProps> = ({
  id,
  read,
  author,
  authorUser,
  bookmark,
  title,
  hasDoc,
  shortText,
  date,
  category,
  folder,
  important,
}) => {
  const { lang } = useLangContext();
  const { hasAvatar, name: authorName } = authorUser;

  const rootCn = classnames(S.root, {
    [S.notRead]: !read,
  });

  const readMarkCn = classnames(S.readMark, {
    [S.readMarkSelected]: !read,
  })

  const bookmarkCn = classnames(S.bookmark, {
    [S.selectedBookmark]: bookmark || important,
  });

  const onCheckboxClick: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  return (
    <Link to={getLetterUrl(folder, id)} className={rootCn}>
      <div className={readMarkCn} />
      <div
        onClick={onCheckboxClick}
        className={S.avatarContainer}
      >
        <Avatar
          stub={!hasAvatar}
          userName={authorName}
          userId={author}
          className={S.avatar}
        />
        {/** Не было времени делать нормальный чекбокс */}
        <div className={S.checkbox} />
      </div>
      <div className={S.content}>
        <div className={S.author}>
          {authorName}
        </div>
        <div className={bookmarkCn}>
          {important ? <ImportantIcon /> : (
            bookmark ? <SelectedBookmarkIcon /> : <BookmarkIcon />
          )}
        </div>
        <div className={S.text}>
          <span className={S.title}>
            {title}
          </span>
          <span className={S.shortText}>
            {shortText}
          </span>
        </div>
        <div className={S.categories}>
          {category && <Category category={category} className={S.categoryIcon} />}
          {hasDoc && <AttachIcon className={S.attachIcon} />}
        </div>
        <div className={S.date}>
          {getDate(date, false, lang)}
        </div>
      </div>
    </Link>
  );
};

export default LetterShortCut;
