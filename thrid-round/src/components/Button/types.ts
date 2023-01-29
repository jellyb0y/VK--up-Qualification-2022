import type { HTMLAttributes, RefObject } from 'react';

export enum ContentAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
};

export enum ButtonMode {
  Transparent = 'transparent',
  Primary = 'primary',
  Contrast = 'contrast',
  Secondary = 'Secondary',
}

export interface ButtonProps extends HTMLAttributes<HTMLDivElement>{
  contentAlign?: ContentAlign;
  className?: string;
  onClick?: () => void;
  mode?: ButtonMode;
  stretch?: boolean;
  selected?: boolean;
  href?: string;
  ref?: RefObject<HTMLDivElement>;
}
