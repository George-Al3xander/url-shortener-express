import { Router } from "express";
import { inject, injectable } from "inversify";

import { IRoute } from "@/common/routes.interface";

import { ILogger } from "@/logger";

import { TYPES } from "@/constants/consts";

@injectable()
export default abstract class BaseController {
    private readonly _router: Router;
    constructor(@inject(TYPES.Logger) private logger: ILogger) {
        this._router = Router();
    }

    get router(): Router {
        return this._router;
    }

    protected bindRoutes(routes: IRoute[]): void {
        for (const { path, method, func, middlewares } of routes) {
            this.logger.info(`[${method.toUpperCase()}] ${path}`);
            const middleware = middlewares?.map((m) => m.execute.bind(m));
            const handler = func.bind(this);
            const pipeline = middleware ? [...middleware, handler] : handler;
            this.router[method](path, pipeline);
        }
    }
}
