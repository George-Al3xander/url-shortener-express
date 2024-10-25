import { Server } from "http";
import express, { Express } from "express";
import { inject, injectable } from "inversify";

import "reflect-metadata";

import { TYPES } from "@/constants/consts";
import IExceptionFilter from "@/errors/exception/exception.filter.interface";
import ILogger from "@/logger/logger.interface";
import { IServerEventsHandler } from "@/server/server.events.handler.interface";
import IUrlController from "@/url/controller/url.controller.interface";

@injectable()
export default class App {
    app: Express;
    server!: Server;
    port: number;
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.ExceptionFilter)
        private exceptionFilter: IExceptionFilter,
        @inject(TYPES.UrlController) private urlController: IUrlController,
        @inject(TYPES.ServerEventsHandler)
        private serverEventsHandler: IServerEventsHandler,
    ) {
        this.app = express();
        this.port = 8000;
    }

    public useExceptionFilters(): void {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public useRoutes(): void {
        this.app.use("/", this.urlController.router);
    }

    public useMiddleware(): void {
        this.app.use(express.json());
    }

    public useServerHandlers(): void {
        this.serverEventsHandler.init(this.server, this.port);
    }

    public async init(): Promise<void> {
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.useServerHandlers();
    }
}
