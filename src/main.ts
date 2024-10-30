import App from "@/app";
import { Container, ContainerModule } from "inversify";

import { ILogger, LoggerService } from "@/logger";

import {
    IServiceID,
    IUrlController,
    IUrlService,
    UrlController,
    UrlIdService,
    UrlService,
} from "@/url";

import { ExceptionFilter, IExceptionFilter } from "@/errors";

import { IServerEventsHandler, ServerEventsHandler } from "@/server";

import { ConfigService, IConfigService } from "@/config";
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
