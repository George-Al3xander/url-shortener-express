import App from "@/app";
import { Container, ContainerModule } from "inversify";

import ILogger from "@/logger/logger.interface";
import LoggerService from "@/logger/logger.service";

import UrlController from "@/url/controller/url.controller";
import IUrlController from "@/url/controller/url.controller.interface";
import UrlIdService from "@/url/id/url-id.service";
import IServiceID from "@/url/id/url-id.service.interface";

import ExceptionFilter from "@/errors/exception/exception.filter";
import IExceptionFilter from "@/errors/exception/exception.filter.interface";

import ServerEventsHandler from "@/server/server.events.handler";
import { IServerEventsHandler } from "@/server/server.events.handler.interface";

import { TYPES } from "@/constants/consts";

interface IBootstrapReturn {
    app: App;
    appContainer: Container;
}

export const appBindings = new ContainerModule((bind) => {
    bind<ILogger>(TYPES.Logger).to(LoggerService);
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<IServerEventsHandler>(TYPES.ServerEventsHandler).to(
        ServerEventsHandler,
    );
    bind<IUrlController>(TYPES.UrlController).to(UrlController);
    bind<IServiceID>(TYPES.IdService).to(UrlIdService);
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
