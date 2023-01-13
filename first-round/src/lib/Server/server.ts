import http from 'http';

import { matchUrl } from '@utils/matchUrl';

import type { ServerResponse } from 'http';
import type { Entrypoints, ErrorCallback, InitParams, QueryParams, Request, Response, Router } from './types';

export class Server {
  private instance: http.Server;
  private path: string = '';
  private onErrorCallback: ErrorCallback;

  private getEntrypoints: Entrypoints;
  private postEntrypoints: Entrypoints;

  static assertPath(pattern: string) {
    if (pattern && !/^(?:\/.*|\*)/.exec(pattern)) {
      throw new Error('Pattern should start with `/`: ' + pattern);
    }
  };

  static route(): Router {
    const router: Router = {
      routes: {},
      getEntrypoints: {},
      postEntrypoints: {},
      get: (pattern, entrypoint) => {
        Server.assertPath(pattern);
        router.getEntrypoints[pattern] = entrypoint;
      },
      post: (pattern, entrypoint) => {
        Server.assertPath(pattern);
        router.postEntrypoints[pattern] = entrypoint;
      },
      connect: (path: string, anotherYetRouter: Router) => {
        Server.assertPath(path);
        router.routes[path] = anotherYetRouter;
      },
    };

    return router;
  }

  constructor(params?: InitParams) {
    const {
      defaultPath = '',
    } = params || {};

    Server.assertPath(defaultPath);
    this.path = defaultPath;

    this.getEntrypoints = {};
    this.postEntrypoints = {};

    this.instance = http.createServer(this.listener.bind(this));
  }

  private relyOnEntrypoint(req: Request, res: Response, urlStartWith = ''): boolean {
    const { method, url } = req;
    const dryUrl = url.replace(/\?.*$/, '');

    const entrypoints: Entrypoints = method === 'GET'
      ? this.getEntrypoints
      : method === 'POST'
        ? this.postEntrypoints
        : null;

    if (entrypoints) {
      return Object.entries(entrypoints).some(([pattern, handler]) => {
        const match = matchUrl(pattern, urlStartWith + dryUrl);

        if (!match) {
          return false;
        }

        handler(req, res, match);
        return true;
      });
    }

    return false;
  }

  private async listener(req: Request, res: Response) {
    const startTs = Date.now();

    const endResponse = () => {
      res.end();
      const responseTime = Date.now() - startTs;
      console.log(`[Request ${new Date().toTimeString()}] (url - ${req.url}): Time: ${responseTime}ms`);
    };

    try {
      const buffers = [];

      for await (const chunk of req) {
        buffers.push(chunk);
      }

      const body = Buffer.concat(buffers).toString() || undefined;
      const queryString = req.url.match(/\?(.+)$/)?.[1];
      const queryParams = queryString?.split('&').reduce((params, bunch) => {
        const [key, value] = bunch.split('=');

        return {
          ...params,
          [key]: value,
        };
      }, {} as QueryParams)
      
      req.body = body;
      req.query = queryParams;
      res.endResponse = endResponse;

      if (!this.relyOnEntrypoint(req, res)) {
        res.statusCode = 404;
        res.endResponse();
      }
    } catch (error) {
      this.onErrorCallback(error);
      res.statusCode = 500;
      res.endResponse();
    }
  }

  private createAbsolutePath(path: string, pattern: string): string {
    return (path + pattern).replace(/\/{2,}/g, '/');
  }

  private applyEntrypointsFromRoute(routerPath: string, router: Router) {
    Object.entries(router.getEntrypoints).forEach(([pattern, entrypoint]) => {
      const absPath = this.createAbsolutePath(routerPath, pattern);
      this.getEntrypoints[absPath] = entrypoint;
    });

    Object.entries(router.postEntrypoints).forEach(([pattern, entrypoint]) => {
      const absPath = this.createAbsolutePath(routerPath, pattern);
      this.postEntrypoints[absPath] = entrypoint;
    });

    Object.entries(router.routes).forEach(([path, router]) => {
      this.applyEntrypointsFromRoute(routerPath + path, router);
    });
  }

  public connectRouter(routerPath: string, router: Router) {
    this.applyEntrypointsFromRoute(this.path + routerPath, router);
  };

  public listen(port: number) {
    this.instance.listen(port);
  }

  public onError(callback: ErrorCallback) {
    this.onErrorCallback = callback;
  }
}
