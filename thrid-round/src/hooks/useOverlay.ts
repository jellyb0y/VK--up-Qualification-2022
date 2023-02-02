import { useCallback, useEffect, useRef } from 'react';

export interface Options {
  visible?: boolean;
  onClose: () => void;
}

export const IGNORE_ATTRIBUTE_NAME = 'data-overlay-ignore';

export const IGNORE_ATTRIBUTE_VALUE = 'ignore';

export const IGNORE_ATTRIBUTES = {
  [IGNORE_ATTRIBUTE_NAME]: IGNORE_ATTRIBUTE_VALUE,
};

export const useOverlay = <T extends HTMLElement>(options: Options) => {
  const { visible = true, onClose } = options;

  const containerRef = useRef<T>();

  const handleClick = useCallback((event: Event) => {
    const containerElem = containerRef.current;

    if (!containerElem) {
      return;
    }

    const target = event.target as HTMLElement;
    const ignoreElements = document.querySelectorAll(`[${IGNORE_ATTRIBUTE_NAME}="${IGNORE_ATTRIBUTE_VALUE}"]`);

    const isTargetInsideIgnoreElements = Array.from(ignoreElements).some((element) => {
      return element.contains(target);
    });

    if (isTargetInsideIgnoreElements) {
      return;
    }

    if (!containerRef.current.contains(target)) {
      onClose?.();
    }
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || !visible) {
      return;
    }

    window.addEventListener('mousedown', handleClick, true);
    window.addEventListener('touchstart', handleClick, true);
    
    return () => {
      window.removeEventListener('mousedown', handleClick, true);
      window.removeEventListener('touchstart', handleClick, true);
    };
  }, [containerRef.current, visible, handleClick]);

  return containerRef;
};
