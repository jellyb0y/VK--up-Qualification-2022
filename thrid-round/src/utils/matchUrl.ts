export type UrlParams = Record<string, string>;

export const matchUrl = (pattern: string, url: string): UrlParams | null => {
  const paramsNames = [...pattern.matchAll(/:([^/]+)/g)].map(([_, name]) => name);
  const formatedPattern = pattern.replace(/\*/g, '.*').replace(/:[^/]+/g, '([^/]+)');
  const patternRegexp = new RegExp(`^${formatedPattern}$`, 'i');

  const matchedParams = url.match(patternRegexp)?.slice(1);

  const hasMatch = matchedParams && (
    paramsNames?.length > 0
      ? paramsNames?.length === matchedParams.length
      : true
  )

  if (!hasMatch) {
    return null;
  }

  return paramsNames.reduce((params, paramName, index) => {
    return {
      ...params,
      [paramName]: matchedParams[index],
    };
  }, {} as UrlParams);
};
