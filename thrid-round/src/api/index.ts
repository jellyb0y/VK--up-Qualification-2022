import Server from '@lib/Server';

import { getFolders } from './views/getFolders';
import { getAvatar } from './views/getAvatar';
import { getLetter } from './views/getLetter';
import { getLetters } from './views/getLetters';
import { getLetterDoc } from './views/getLetterDoc';
import { sendLetter } from './views/sendLetter';

export const apiRouter = Server.route();

apiRouter.get('/getAvatar', getAvatar);
apiRouter.get('/getLetters', getLetters);
apiRouter.get('/getLetter', getLetter);
apiRouter.get('/getFolders', getFolders);
apiRouter.get('/getLetterDoc', getLetterDoc);

apiRouter.post('/sendLetter', sendLetter);
