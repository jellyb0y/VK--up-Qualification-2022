export const mockUrl = (pattern: string) => {
  return pattern.replace(/:[^/]+/g, '[any]')
};
