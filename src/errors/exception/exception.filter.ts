import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import "reflect-metadata";

import { ILogger } from "@/logger";

import { HTTPError, IExceptionFilter } from "@/errors";

import { TYPES } from "@/constants/consts";

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
    constructor(@inject(TYPES.Logger) private logger: ILogger) {}
    catch(
        exception: Error | HTTPError,
        _req: Request,
        res: Response,
        _next: NextFunction,
    ): void {
        if ("statusCode" in exception) {
            this.logger.error(
                `[${exception.context || exception.constructor.name}] Error ${exception.statusCode}: ${exception.message}`,
            );
            res.status(exception.statusCode).send({ error: exception.message });
        } else {
            this.logger.error(exception.message);
            res.status(500).send({ error: exception.message });
        }
    }
}
