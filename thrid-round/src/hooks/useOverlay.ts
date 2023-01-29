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
    const target = event.target as HTMLElement;

    if (target.getAttribute(IGNORE_ATTRIBUTE_NAME) === IGNORE_ATTRIBUTE_VALUE) {
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

    window.addEventListener('click', handleClick, true);
    
    return () => {
      window.removeEventListener('click', handleClick, true);
    };
  }, [containerRef.current, visible, handleClick]);

  return containerRef;
};
