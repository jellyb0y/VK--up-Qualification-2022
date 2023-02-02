import type { FC } from 'react';

export interface MidificatorsProps {
  modificators: ModificatorsList;
}

export type Comand = string | [string, boolean, string] | (() => void);

export type ModificatorsList = Record<string, {
  id: string;
  Icon: FC;
  comand?: Comand;
}>;
