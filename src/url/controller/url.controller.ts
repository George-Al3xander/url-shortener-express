import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { BaseController } from "@/common";

import { ILogger } from "@/logger";

import { IUrlController, IUrlRepository, UrlDto } from "@/url";

import { TYPES } from "@/constants/consts";

import "reflect-metadata";

import { SecretMiddleware } from "@/common/secret.middleware";
import { ValidateMiddleware } from "@/common/validate.middleware";

import { IConfigService } from "@/config";

import { HTTPError } from "@/errors";

import { getCurrentURL } from "@/lib/utils";

@injectable()
export default class UrlController
    extends BaseController
    implements IUrlController
{
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.UrlRepository) private urlRepository: IUrlRepository,
    ) {
        super(loggerService);
        this.bindRoutes([
            { path: "/:id", method: "get", func: this.redirectById },
            {
                path: "/",
                method: "post",
                func: this.generateId,
                middlewares: [
                    new SecretMiddleware(
                        this.loggerService,
                        this.configService,
                    ),
                    new ValidateMiddleware(UrlDto),
                ],
            },
        ]);
    }

    async generateId(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const url = await this.urlRepository.create(req.body.url);
        if (url) {
            const redirect_url = new URL(getCurrentURL(req));
            redirect_url.pathname = url.shortened_id;
            res.status(201).json({
                original_url: url.original_url,
                redirect_url,
            });
        } else {
            next(new HTTPError(409, "Failed to shorten the URL"));
        }
    }

    async redirectById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const url = await this.urlRepository.find(req.params.id);
        if (url) {
            res.redirect(url.original_url);
        } else {
            const redirectUrl = this.configService.get("404_REDIRECT_URL");
            if (redirectUrl) {
                res.redirect(redirectUrl);
            } else {
                next(
                    new HTTPError(
                        404,
                        "Unable to find the URL associated with the provided shortened ID.",
                    ),
                );
            }
        }
    }
}
