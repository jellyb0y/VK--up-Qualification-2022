import type { RefObject } from 'react';

export enum ContentAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
};

export enum ButtonMode {
  Transparent = 'transparent',
  Primary = 'primary',
  Contrast = 'contrast',
}

export interface ButtonProps {
  contentAlign?: ContentAlign;
  className?: string;
  onClick?: () => void;
  mode?: ButtonMode;
  stretch?: boolean;
  selected?: boolean;
  href?: string;
  ref?: RefObject<HTMLDivElement>;
}
