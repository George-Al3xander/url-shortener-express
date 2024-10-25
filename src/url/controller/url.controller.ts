import e from "express";
import { inject, injectable } from "inversify";

import { BaseController } from "@/common";

import { ILogger } from "@/logger";

import { IServiceID, IUrlController } from "@/url";

import { TYPES } from "@/constants/consts";

import "reflect-metadata";

import isUrl from "is-url";

import HTTPError from "@/errors/http-error";

@injectable()
export default class UrlController
    extends BaseController
    implements IUrlController
{
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.IdService) private idService: IServiceID,
    ) {
        super(loggerService);
        this.bindRoutes([
            { path: "/", method: "get", func: this.redirectById },
            { path: "/", method: "post", func: this.generateId },
        ]);
    }

    generateId(req: e.Request, res: e.Response, next: e.NextFunction): void {
        const url = req.body.url;
        if (url) {
            if (isUrl(url)) {
                res.status(201).json({
                    url,
                    shortId: this.idService.generate(),
                });
            } else {
                next(
                    new HTTPError(
                        422,
                        "The provided URL is invalid!",
                        "shortener",
                    ),
                );
            }
        } else {
            next(new HTTPError(400, "No URL provided!"));
        }
    }

    redirectById(
        _req: e.Request,
        res: e.Response,
        _next: e.NextFunction,
    ): void {
        res.send("redirect");
    }
}
