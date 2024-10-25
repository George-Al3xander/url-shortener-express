import { Router } from "express";
import { inject, injectable } from "inversify";

import { IRoute } from "@/common/routes.interface";
import { TYPES } from "@/constants/consts";
import ILogger from "@/logger/logger.interface";

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
        for (const { path, method, func } of routes) {
            this.logger.info(`[${method.toUpperCase()}] ${path}`);
            const handler = func.bind(this);
            this.router[method](path, handler);
        }
    }
}
