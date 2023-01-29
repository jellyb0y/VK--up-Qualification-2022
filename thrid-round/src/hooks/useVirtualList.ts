import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export type PreloadCallback = (indexTo: number) => void; 

export type Config = {
  itemHeight: number;
};

export type Range = [number, number];

export interface Options {
  /**
   * Максимальное количество элементов
   */
  totalItems: number;
  /**
   * Текущее количество элементов
   */
  itemsCount: number;
  /**
   * Количество элементов сверху и снизу от границы видимости,
   * которые не должены быть скрыты
   */
  visibleOffset: number;
  /**
   * Оффсет, за границей которого нужно дозагружать элементы
   * считается от границы `visibleOffset`
   */
  preloadOffset?: number;
  /**
   * Дебаунс функции пересчета
   */
  scrollDebounce?: number;
  /**
   * Колбэк на дозагрузку
   */
  onPreload?: PreloadCallback,
}

export const useVirtualList = <L extends HTMLElement, S extends HTMLElement>(options: Options) => {
  const {
    totalItems,
    itemsCount,
    visibleOffset,
    preloadOffset,
    scrollDebounce = 0,
    onPreload,
  } = options;

  const [visilbeRange, setVisibleRange] = useState<Range>(null);

  const listRef = useRef<L>();
  const scrollRef = useRef<S>();

  const configRef = useRef<Config>();

  const getItemsHeight = useCallback(() => {
    const listElem = listRef.current;

    if (!listElem) {
      return;
    }

    let currentElem: HTMLElement = listElem.firstChild as HTMLElement;
    while (currentElem.getAttribute('data-virtual-list') === 'ignore') {
      currentElem = currentElem.nextElementSibling as HTMLElement;
    }

    return currentElem.offsetHeight;
  }, []);

  const calculateRanges = useCallback(() => {
    const scrollElem = scrollRef.current;
    const listElem = listRef.current;

    if (!scrollElem || !listElem) {
      return;
    }

    const { itemHeight } = configRef.current;

    // Считаем количество элементов, которые нужно скрыть сверху
    const scrollTop = scrollElem.scrollTop;
    const topVisibleIndex = Math.ceil(scrollTop / itemHeight);
    const topUnvisibleIndex = topVisibleIndex < visibleOffset ? 0 : topVisibleIndex - visibleOffset;

    // Считаем количество элементов, которые нужно скрыть снизу
    const scrollClientHeight = scrollElem.clientHeight;
    const scrollBottom = scrollTop + scrollClientHeight;

    const bottomVisibleIndex = Math.floor(scrollBottom / itemHeight);
    const bottomUnvisibleIndex = bottomVisibleIndex + visibleOffset > totalItems
      ? totalItems
      : bottomVisibleIndex + visibleOffset;

    setVisibleRange([topUnvisibleIndex, bottomUnvisibleIndex]);

    // Считаем индекс элемента еще нужно дозагрузить
    const preloadIndex = bottomUnvisibleIndex + preloadOffset > totalItems
      ? totalItems
      : bottomUnvisibleIndex + preloadOffset;

    onPreload(preloadIndex);
  }, [itemsCount, totalItems]);

  const calculateRangesDebaunce = useMemo(() => (
    debounce(calculateRanges, scrollDebounce, { maxWait: scrollDebounce })
  ), [calculateRanges]);

  useIsomorphicLayoutEffect(calculateRangesDebaunce, [totalItems]);

  useEffect(() => {
    const scrollElem = scrollRef.current;
    const listElem = listRef.current;

    if (!scrollElem || !listElem) {
      return;
    }

    if (!configRef.current) {
      // Считаем, что высоты у элементов одинаковые и отступов нет
      const itemHeight = getItemsHeight();

      if (!itemHeight) {
        console.error('Abort: Failed to get element with non 0 height');
        return;
      }

      // Высчитываем офсеты для дальнейших расчетов
      configRef.current = {
        itemHeight,
      };
    }

    scrollElem.addEventListener('scroll', calculateRangesDebaunce);
    window.addEventListener('resize', calculateRangesDebaunce);

    return () => {
      scrollElem.removeEventListener('scroll', calculateRangesDebaunce);
      window.removeEventListener('resize', calculateRangesDebaunce);
    };
  }, [scrollRef.current, listRef.current, calculateRangesDebaunce, getItemsHeight]);

  return {
    listRef,
    scrollRef,
    visilbeRange,
    itemHeight: configRef.current?.itemHeight,
  };
};
