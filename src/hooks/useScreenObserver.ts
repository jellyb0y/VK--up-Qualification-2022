import { useCallback, useEffect, useState } from "react";

export enum ScreenType {
  Desktop = '>768',
  Tablet = '<=768'
};

export const useScreenObserver = () => {
  const [screenType, setScreenType] = useState<ScreenType | null>(null);

  const calculateScreenType = useCallback(() => {
    const windowWidth = window.innerWidth;
    const screenType = Object.entries(ScreenType).find(([_screenName, value]) => {
      const match = value.match(/^((?:<|>)=?)(\d+)$/);
      if (!match) {
        return false;
      }

      const [_, compareSign, widthValue] = match;
      const width = Number(widthValue);

      switch (compareSign) {
        case '>':
          return windowWidth > width;

        case '>=':
          return windowWidth >= width;

        case '<':
          return windowWidth < width;

        case '<=':
          return windowWidth <= width;

        default:
          return false;
      }
    });

    setScreenType(ScreenType[screenType[0]]);
  }, []);

  useEffect(() => {
    calculateScreenType();

    window.addEventListener('resize', calculateScreenType);

    return () => {
      window.removeEventListener('resize', calculateScreenType);
    };
  }, [calculateScreenType]);

  return screenType;
};
