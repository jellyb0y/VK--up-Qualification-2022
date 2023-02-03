import { useCallback, useEffect, useRef, useState } from 'react';

export type DropFileCallback = (files: File[]) => void;

export type DropDataCallback<T> = <T>(data: T) => void;

export enum DragObserverType {
  File = 'File',
  Text = 'Text',
}

export type DropCallbacks = {
  [DragObserverType.File]: DropFileCallback;
  [DragObserverType.Text]: DropDataCallback<string>;
}

const DRAG_TIME = 50;

export const useDragNDrop = <
  T extends HTMLElement,
  C extends DragObserverType = DragObserverType,
  D extends DropCallbacks[C] = DropCallbacks[C],
>(
  type: C,
  dropCallback: D,
) => {
  const [isDrag, setDrag] = useState(false);
  const [isDragOver, setDragOver] = useState(false);

  const containerRef = useRef<T>();
  const dragEndTimerRef = useRef<NodeJS.Timer>();
  const dragOverTimerRef = useRef<NodeJS.Timer>();

  const onDragStart = useCallback((event: DragEvent) => {
    clearTimeout(dragEndTimerRef.current);
    setDrag(type === DragObserverType.File ? !!event.dataTransfer.files : true);
  }, []);

  const onDragEnd = useCallback(() => {
    dragEndTimerRef.current = setTimeout(() => {
      setDrag(false);
    }, DRAG_TIME);
  }, []);

  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault();

    if (type === DragObserverType.File) {
      const files = Array.from(event.dataTransfer.files);
      dropCallback(files);
    } else {
      const data = event.dataTransfer.getData('text');
      (dropCallback as DropDataCallback<string>)(data);
    }

    setDrag(false);
  }, []);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    setDragOver(true);
    clearTimeout(dragOverTimerRef.current);
    dragOverTimerRef.current = setTimeout(() => {
      setDragOver(false);
    }, DRAG_TIME);
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.addEventListener('dragover', onDragOver);
    containerRef.current.addEventListener('drop', onDrop);

    window.addEventListener('dragover', onDragStart);
    window.addEventListener('dragleave', onDragEnd);

    return () => {
      clearTimeout(dragEndTimerRef.current);

      window.removeEventListener('dragover', onDragStart);
      window.removeEventListener('dragleave', onDragEnd);

      containerRef.current.removeEventListener('dragover', onDragOver);
      containerRef.current.removeEventListener('drop', onDrop);
    };
  }, [onDragStart, onDragEnd, onDrop, onDragOver]);

  return {
    containerRef,
    isDragOver,
    isDrag,
  };
};
