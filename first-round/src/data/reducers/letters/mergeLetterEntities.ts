import type { UnionLettersEntity } from '@database/types';

export const mergeLetterEntities = (entitiesA: UnionLettersEntity['entities'], entitiesB: UnionLettersEntity['entities']): UnionLettersEntity['entities'] => {
  const lettersA = Object.values(entitiesA);
  const lettersB = Object.values(entitiesB);

  const result = {
    ...entitiesA,
    ...entitiesB,
  };

  [...lettersA, ...lettersB].forEach((letter) => {
    if (!letter.isShort) {
      result[letter.id] = letter;
    }
  });

  return result;
};
