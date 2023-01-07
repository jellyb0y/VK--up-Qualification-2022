import { Router } from 'express';

import { getAvatar } from './views/getAvatar';
import { getLetter } from './views/getLetter';
import { getLetters } from './views/getLetters';

export const apiRouter = Router();

apiRouter.get('/getAvatar', getAvatar);
apiRouter.get('/getLetters', getLetters);
apiRouter.get('/getLetter', getLetter);
