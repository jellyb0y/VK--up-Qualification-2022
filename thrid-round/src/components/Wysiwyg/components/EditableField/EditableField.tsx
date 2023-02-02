import { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import S from './EditableField.scss';

import type { EditableFieldProps } from './types';

const EditableField = forwardRef<HTMLDivElement, EditableFieldProps>(({
  className,
  defaultText,
  onStatusChange,
}, ref) => {
  const containerRef = ref as RefObject<HTMLDivElement> || useRef<HTMLDivElement>();
  const [isPlaceholderActive, setPlaceholderActive] = useState(true);

  const focusHandler = () => {
    setPlaceholderActive(false);
  };

  const blurHandler = () => {
    const hasFieldContent = containerRef.current?.innerHTML.length > 0;
    setPlaceholderActive(!hasFieldContent);
  }

  const inputHandler = () => {
    const hasFieldContent = containerRef.current?.innerHTML.length > 0;
    onStatusChange(hasFieldContent);
  }

  const rootCn = classnames(S.root, className, {
    [S.placeholder]: isPlaceholderActive && defaultText,
  });

  return (
    <div
      data-has-content={!isPlaceholderActive}
      ref={containerRef}
      contentEditable
      onInput={inputHandler}
      onKeyDown={inputHandler}
      onFocus={focusHandler}
      onBlur={blurHandler}
      className={rootCn}
      spellCheck
      aria-multiline
      aria-label="false"
      role="textbox"
      dir="true"
      dangerouslySetInnerHTML={
        isPlaceholderActive && defaultText ? {
          __html: defaultText,
        } : undefined
      }
    />
  );
});

export default EditableField;
