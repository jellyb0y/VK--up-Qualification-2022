import type { FC } from 'react';

export interface CategoryProps {
  category: string;
  withName?: boolean;
  className?: string;
}

export interface IconProps {
  className: string;
}

export type IconsRegistry = Record<string, FC<IconProps>>;
