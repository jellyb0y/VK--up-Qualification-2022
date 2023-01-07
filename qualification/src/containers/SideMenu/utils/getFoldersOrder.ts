export const getFoldersOrder = (orderRule: string[], ids: string[]): string[] => {
  const idsToGet = ids.filter((id) => !orderRule.includes(id));
  
  return orderRule.reduce((order, key) => {
    if (key === '*') {
      return [
        ...order,
        ...idsToGet,
      ];
    }
    
    return [
      ...order,
      key,
    ];
  }, [] as string[]);
};
