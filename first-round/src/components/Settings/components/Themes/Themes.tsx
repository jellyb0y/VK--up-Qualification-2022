import { useContext } from 'react';

import DoneIcon from '@assets/images/done_icon.svg';

import { Context } from '@lib/Themes/context';
import { getThemeConfig, Registry } from '@lib/Themes/themeRegistry';

import S from './Themes.scss';

import type { FC } from 'react';
import { Schemes } from '@lib/Themes/types';

const BASIC_THEMES = [
  'brown',
  'gray',
  'purpule',
  'dark_blue',
  'purpule_blue',
  'pink',
  'red',
  'green',
  'mint',
  'pale_brown',
  'peach',
  'soft_green',
  'soft_blue',
  'soft_purpule',
  'soft_white',
  'dark_white',
];

const SCHEMES = [
  Schemes.Dark,
  Schemes.Light,
];

const OTHER_THEMES = Object.keys(Registry)
  .reduce((list, themeName) => {
    console.log(themeName, BASIC_THEMES.includes(themeName), SCHEMES.includes(themeName as Schemes));
    if (BASIC_THEMES.includes(themeName) || SCHEMES.includes(themeName as Schemes)) {
      return list;
    }

    list.push(themeName);

    return list;
  }, [...SCHEMES] as string[]);

const Themes: FC = () => {
  const {
    setScheme,
    setTheme,
    scheme: activeScheme,
    theme: activeTheme,
  } = useContext(Context);

  return (
    <>
      <div className={S.title}>
        Настройки внешнего вида вашей почты и темы оформления
      </div>
      <div className={S.themes}>
        {BASIC_THEMES.map((themeName: string) => {
          const themeConfig = getThemeConfig(themeName);
          const isSelected = activeTheme === themeName;

          return themeConfig ? (
            <div
              key={themeName}
              onClick={() => setTheme(themeName)}
              className={S.basicThemeItem}
            >
              <div style={{ backgroundColor: themeConfig.color }}>
                {isSelected && (
                  <>
                    <div className={S.doneBg} />
                    <DoneIcon />
                  </>
                )}
              </div>
            </div>
          ) : null;
        })}
      </div>
      <div className={S.themes}>
        {OTHER_THEMES.map((themeName: string) => {
          const themeConfig = getThemeConfig(themeName);
          const isScheme = [Schemes.Dark, Schemes.Light].includes(themeName as Schemes);

          const isSelected = isScheme
            ? (activeScheme === themeName && !activeTheme)
            : activeTheme === themeName;

          const handler = () => isScheme ? setScheme(themeName as Schemes) : setTheme(themeName);

          return themeConfig ? (
            <div
              key={themeName}
              onClick={handler}
              className={S.otherThemeItem}
            >
              <div style={{
                backgroundColor: themeConfig.color,
                backgroundImage: `url(${themeConfig.image})`,
              }}>
                {isSelected && (
                  <>
                    <div className={S.doneBg} />
                    <DoneIcon />
                  </>
                )}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};

export default Themes;
