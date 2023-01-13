import type { UrlParams } from '@utils/matchUrl';
import type { IncomingMessage, ServerResponse } from 'http';

export interface InitParams {
  defaultPath?: string;
}

export type ErrorCallback = (error: Error) => void;

export type QueryParams = Record<string, string>;

export type Request = IncomingMessage & { body: string, query: QueryParams };

export type Response = ServerResponse & { endResponse: () => void };

export type Entrypoint = (req: Request, res: Response, params: UrlParams) => Promise<void> | void;

export type Entrypoints = Record<string, Entrypoint>;

export interface Router {
  routes: Record<string, Router>;
  getEntrypoints: Entrypoints;
  postEntrypoints: Entrypoints;
  get: (pattern: string, entrypoint: Entrypoint) => void;
  post: (pattern: string, entrypoint: Entrypoint) => void;
  connect: (path: string, router: Router) => void;
}
