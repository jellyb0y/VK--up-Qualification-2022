import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { ButtonMode, ContentAlign } from './types';

import S from './Button.scss';

import type { ButtonProps } from './types';
import type { FC } from 'react';

const Button: FC<ButtonProps> = ({
  onClick,
  mode = ButtonMode.Transparent,
  contentAlign = ContentAlign.Left,
  children,
  stretch,
  selected,
  className,
  href,
  ref,
  disabled,
  ...other
}) => {
  const rootCn = classnames(
    S.root,
    S[`contentAlign_${contentAlign}`],
    {
      [S.primary]: mode === ButtonMode.Primary,
      [S.secondary]: mode === ButtonMode.Secondary,
      [S.contrast]: mode === ButtonMode.Contrast,
      [S.stretch]: stretch,
      [S.selected]: selected,
      [S.disabled]: disabled,
    },
    className,
  );

  return (
    <div
      ref={ref}
      onClick={disabled ? undefined : onClick}
      className={rootCn}
      {...other}
    >
      {href && (
        <Link
          className={S.link}
          to={href}
        />
      )}
      {children}
    </div>
  );
};

export default Button;
