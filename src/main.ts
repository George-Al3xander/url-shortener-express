import { Container, ContainerModule } from "inversify";

import App from "@/app";

import { ConfigService, IConfigService } from "@/config";

import { ILogger, LoggerService } from "@/logger";

import { DatabaseService, IDatabaseService } from "@/db";

import {
    IServiceID,
    IUrlController,
    IUrlRepository,
    IUrlService,
    UrlController,
    UrlIdService,
    UrlRepository,
    UrlService,
} from "@/url";

import { ExceptionFilter, IExceptionFilter } from "@/errors";

import { IServerEventsHandler, ServerEventsHandler } from "@/server";

import { TYPES } from "@/constants/consts";

interface IBootstrapReturn {
    app: App;
    appContainer: Container;
}

export const appBindings = new ContainerModule((bind) => {
    bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
    bind<IExceptionFilter>(TYPES.ExceptionFilter)
        .to(ExceptionFilter)
        .inSingletonScope();
    bind<IServerEventsHandler>(TYPES.ServerEventsHandler).to(
        ServerEventsHandler,
    );
    bind<IUrlController>(TYPES.UrlController)
        .to(UrlController)
        .inSingletonScope();
    bind<IUrlService>(TYPES.UrlService).to(UrlService).inSingletonScope();
    bind<IServiceID>(TYPES.IdService).to(UrlIdService).inSingletonScope();
    bind<IConfigService>(TYPES.ConfigService)
        .to(ConfigService)
        .inSingletonScope();
    bind<IDatabaseService>(TYPES.DatabaseService)
        .to(DatabaseService)
        .inSingletonScope();
    bind<IUrlRepository>(TYPES.UrlRepository)
        .to(UrlRepository)
        .inSingletonScope();
    bind<App>(TYPES.Application).to(App);
});

const boostrap = (): IBootstrapReturn => {
    const appContainer = new Container();
    appContainer.load(appBindings);

    const app = appContainer.get<App>(TYPES.Application);
    app.init();

    return { app, appContainer };
};

boostrap();
