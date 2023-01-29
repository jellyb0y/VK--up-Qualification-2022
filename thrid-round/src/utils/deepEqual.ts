export type Value = object | number | string | null | undefined | unknown[];

export const deepEqual = (objA: Value, objB: Value): boolean => {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (objA === objB) {
    return true;
  }

  if (objA instanceof Object && objB instanceof Object) {
    const isArrayA = Array.isArray(objA);
    const objBKeys = new Set<string>(Object.keys(objB));

    return Object.entries(objA).every(([key, valueA]) => {
      objBKeys.delete(key);
      const keyA = isArrayA ? Number(key) : key;
      return deepEqual(valueA, objB[keyA]);
    }) && objBKeys.size === 0;
  }

  return false;
};
