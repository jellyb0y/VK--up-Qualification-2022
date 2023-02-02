import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

import Settings from '@components/Settings';

import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect';

import { FC } from 'react';
import type { SettingsContainerProps } from './types';

const ANIMATION_DURATION = 100;

const SettingsContainer: FC<SettingsContainerProps> = ({
  onClose,
}) => {
  const [isVisible, setVisible] = useState(false);
  const isLoadedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>();

  const bodyElement = document.body;
  const rootElement = bodyElement.querySelector('#root') as HTMLDivElement;

  const onClickOutside = useCallback((event: Event) => {
    if (!containerRef.current) {
      return;
    }

    const target = event.target as HTMLElement;

    if (
      !containerRef.current?.contains(target) ||
      rootElement.contains(target)
    ) {
      setVisible(false);
    }
  }, [onClose]);

  useEffect(() => {
    if (isLoadedRef.current && !isVisible) {
      setTimeout(onClose, ANIMATION_DURATION);
    }
  }, [isVisible]);

  useIsomorphicLayoutEffect(() => {
    if (!rootElement || !containerRef.current) {
      return;
    }

    // Фикс закрытия модалки при открытии
    setTimeout(() => {
      setVisible(true);
      isLoadedRef.current = true;
      rootElement.style.transform = `scale(0.8)`;
      window.addEventListener('click', onClickOutside, true);
    });

    return () => {
      window.removeEventListener('click', onClickOutside, true);
    }
  }, [containerRef.current, onClickOutside]);

  useEffect(() => {
    return () => {
      rootElement.style.transform = null;
    }
  }, []);

  return createPortal(
    <Settings containerRef={containerRef} />,
    bodyElement
  );
};

export default SettingsContainer;
