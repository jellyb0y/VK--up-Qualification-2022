export enum ContentAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
};

export enum ButtonMode {
  Transparent = 'transparent',
  Primary = 'primary',
}

export interface ButtonProps {
  contentAlign?: ContentAlign;
  className?: string;
  onClick?: () => void;
  mode?: ButtonMode;
  stretch?: boolean;
  selected?: boolean;
}
