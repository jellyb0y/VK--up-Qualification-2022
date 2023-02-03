import type { ReactNode } from 'react';

export interface WysiwygProps {
  onStatusChange?: (status: boolean) => void;
  className?: string;
  controlsSlot?: ReactNode;
}
