import TextBoldIcon from '@assets/images/wysiwyg/bold_text.svg';
import TextCrosscon from '@assets/images/wysiwyg/cross_text.svg';
import TextCursiveIcon from '@assets/images/wysiwyg/cursive_text.svg';
import TextUnderlineIcon from '@assets/images/wysiwyg/underline_text.svg';
import OrderedListIcon from '@assets/images/wysiwyg/ordered_list.svg';
import UnorderedListIcon from '@assets/images/wysiwyg/unordered_list.svg';

import type { ModificatorsList } from './components/Midificators/types';

export const MODIFICATORS: ModificatorsList = {
  'textBold': {
    id: 'textBold',
    Icon: TextBoldIcon,
    comand: 'bold',
  },
  'textCursive': {
    id: 'textCursive',
    Icon: TextCursiveIcon,
    comand: 'italic',
  },
  'textUnderline': {
    id: 'textUnderline',
    Icon: TextUnderlineIcon,
    comand: 'underline',
  },
  'textCross': {
    id: 'textCross',
    Icon: TextCrosscon,
    comand: 'strikethrough',
  },
  'orderList': {
    id: 'orderList',
    Icon: OrderedListIcon,
    comand: 'insertOrderedList',
  },
  'unorderList': {
    id: 'unorderList',
    Icon: UnorderedListIcon,
    comand: 'insertUnorderedList',
  },
};
