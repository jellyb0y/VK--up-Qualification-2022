export type Func<A extends any[], R> = (...args: A) => R;

const memo = <A extends any[], R>(func: Func<A, R>): Func<A, R> => {
  const argsResultMap = new Map<A[number], R>();

  return (...args: A): R => {
    const reference = argsResultMap.get(args[0]);
    const hasCache = args.slice(1).every((arg) => argsResultMap.get(arg) === reference);

    if (hasCache && reference !== undefined) {
      return reference;
    }

    const result = func(...args);
    args.forEach((arg) => {
      argsResultMap.set(arg, result);
    });

    return result;
  };
};

export default memo;
