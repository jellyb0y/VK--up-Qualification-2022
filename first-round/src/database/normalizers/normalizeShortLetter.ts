import type { Letter, ShortLetter } from '@database/types';

const SHORT_TEXT_LENGTH = 100;

export const normalizeShortLetter = ({
  to,
  text,
  doc,
  ...otherFields
}: Letter): ShortLetter => ({
  ...otherFields,
  isShort: true,
  shortText: text.substring(0, SHORT_TEXT_LENGTH),
  hasDoc: !!doc,
});
