import type { SendLetterParams } from '@data/resourses/letters/sendLetter';

export interface LetterComposeProps {
  isSending: boolean;
  hasError: boolean;
  hasSent: boolean;
  onClose: () => void;
  sendLetter: (data: SendLetterParams) => void;
}
