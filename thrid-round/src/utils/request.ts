export enum Method {
  Get = 'GET',
  POST = 'POST',
} 

export interface Options {
  method?: Method;
  params?: Record<string, number | string | boolean>;
  body?: unknown;
  signal?: AbortSignal;
}

export const makeSearchParams = (params: Options['params']): string => {
  const normalizedParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value === undefined) {
      return acc;
    }

    if (typeof value === 'boolean') {
      acc[key] = value ? '1' : '0';
    } else if (typeof value === 'number') {
      acc[key] = String(value);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, string>);

  const queryString = new URLSearchParams(normalizedParams).toString();
  
  return queryString.length > 0 ? `?${queryString}` : '';
};

export const request = async (url: string, options: Options) => {
  const {
    method = Method.Get,
    params,
    body,
    signal,
  } = options;

  const queryParams = params
    ? makeSearchParams(params)
    : '';

  const normalizedBody = body
    ? JSON.stringify(body)
    : undefined;

  return fetch(url + queryParams, {
    method,
    body: normalizedBody,
    signal,
  })
    .then((res) => res.json())
};
