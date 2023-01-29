import { useLayoutEffect, useEffect } from 'react';
import { IS_SERVER } from '@utils/isServer';

export const useIsomorphicLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;
