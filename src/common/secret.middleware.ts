import e from "express";
import { inject, injectable } from "inversify";

import { IMiddleware } from "@/common";

import { IConfigService } from "@/config";

import { ILogger } from "@/logger";

import { HTTPError } from "@/errors";

import { TYPES } from "@/constants/consts";

@injectable()
export class SecretMiddleware implements IMiddleware {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.ConfigService) private configService: IConfigService,
    ) {}

    execute(req: e.Request, res: e.Response, next: e.NextFunction): void {
        const providedSecret = req.body.secret_token;
        const requiredToken = this.configService.get("SECRET_TOKEN");

        if (!providedSecret || !requiredToken) {
            this.loggerService.error(
                "Secret Token Not Provided In The ENV File",
            );
            next(new HTTPError(401, "Secret Token Not Provided"));
        } else {
            if (providedSecret != requiredToken) {
                next(new HTTPError(401, "Secret Token Doesn't Match"));
            } else {
                next();
            }
        }
    }
}
