import { useCallback } from 'react';

import S from './Midificators.scss';

import type { FC } from 'react';
import type { Comand, MidificatorsProps } from './types';

const Midificators: FC<MidificatorsProps> = ({
  modificators,
}) => {
  const execModificator = useCallback((comand: Comand) => {
    if (typeof comand === 'function') {
      return comand?.();
    }

    if (Array.isArray(comand)) {
      document.execCommand(...comand);
    } else {
      document.execCommand(comand);
    }
  }, []);

  return (
    <div className={S.root}>
      {Object.values(modificators).map(({ id, Icon, comand }) => (
        <button
          key={id}
          tabIndex={-1}
          onClick={() => execModificator(comand)}
          className={S.modificator}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

export default Midificators;
