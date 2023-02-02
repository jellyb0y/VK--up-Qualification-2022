// import type { RefObject } from 'react';

export interface EditableFieldProps {
  defaultText?: string;
  className?: string;
  onStatusChange?: (status: boolean) => void;
}
