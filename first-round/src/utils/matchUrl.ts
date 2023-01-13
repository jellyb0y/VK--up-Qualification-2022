export type UrlParams = Record<string, string>;

export const matchUrl = (pattern: string, url: string): UrlParams | null => {
  const paramsNames = /:([^/]+)/.exec(pattern)?.slice(1) || [];
  const formatedPattern = pattern.replace(/\*/g, '.*').replace(/:[^/]+/g, '([^/]+)');
  const patternRegexp = new RegExp(`^${formatedPattern}$`);

  const matchedParams = patternRegexp.exec(url)?.slice(1);

  if (!matchedParams || matchedParams.length !== paramsNames.length) {
    return null;
  }

  return paramsNames.reduce((params, paramName, index) => {
    return {
      ...params,
      [paramName]: matchedParams[index],
    };
  }, {} as UrlParams);
};
