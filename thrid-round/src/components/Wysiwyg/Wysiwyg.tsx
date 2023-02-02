import { forwardRef } from 'react';
import classnames from 'classnames';

import Midificators from './components/Midificators';
import EditableField from './components/EditableField';

import { useLanguages } from '@lib/Languages/useLanguages';

import { MODIFICATORS } from './config';

import S from './Wysiwyg.scss';

import type { WysiwygProps } from './types';

const Wysiwyg = forwardRef<HTMLDivElement, WysiwygProps>(({
  className,
  onStatusChange,
}, ref) => {
  const applyLanguage = useLanguages();

  const rootCn = classnames(S.root, className);

  return (
    <div className={rootCn}>
      <Midificators modificators={MODIFICATORS} />
      <div className={S.fieldContainer}>
        <EditableField
          ref={ref}
          onStatusChange={onStatusChange}
          className={S.field}
          defaultText={applyLanguage(['Написать письмо...', 'Write....'])}
        />
      </div>
    </div>
  );
});

export default Wysiwyg;