import classnames from 'classnames';

import Avatar from '@components/Avatar';
import BookmarkIcon from '@assets/images/bookmark.svg';
import SelectedBookmarkIcon from '@assets/images/bookmark_selected.svg';
import AttachIcon from '@assets/images/attach.svg';
import { Link } from 'react-router-dom';

import { getDate } from '@utils/getDate';
import { getLetterUrl } from '@utils/getLetterUrl';

import S from './LetterShortCut.scss';

import type { FC } from 'react';
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
  folder,
}) => {
  const { hasAvatar, name: authorName } = authorUser;

  const rootCn = classnames(S.root, {
    [S.notRead]: !read,
  });

  const readMarkCn = classnames(S.readMark, {
    [S.readMarkSelected]: !read,
  })

  const bookmarkCn = classnames(S.bookmark, {
    [S.selectedBookmark]: bookmark,
  });
  
  return (
    <Link to={getLetterUrl(folder, id)} className={rootCn}>
      <div className={readMarkCn} />
      <Avatar
        stub={!hasAvatar}
        userName={authorName}
        userId={author}
      />
      <div className={S.content}>
        <div className={S.author}>
          {authorName}
        </div>
        <div className={bookmarkCn}>
          {bookmark ? <SelectedBookmarkIcon /> : <BookmarkIcon />}
        </div>
        <div className={S.text}>
          <span className={S.title}>
            {title}
          </span>
          <span className={S.shortText}>
            {shortText}
          </span>
        </div>
        {hasDoc && <AttachIcon className={S.attachIcon} />}
        <div className={S.date}>
          {getDate(date)}
        </div>
      </div>
    </Link>
  );
};

export default LetterShortCut;
