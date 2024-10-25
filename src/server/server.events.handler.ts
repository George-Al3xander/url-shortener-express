import { Server } from "http";
import { inject, injectable } from "inversify";

import { ILogger } from "@/logger";

import { IServerAction, IServerEventsHandler } from "@/server";

import { TYPES } from "@/constants/consts";

@injectable()
export default class ServerEventsHandler implements IServerEventsHandler {
    server!: Server;
    port!: number;
    constructor(@inject(TYPES.Logger) private logger: ILogger) {}

    public handleError(error: unknown): void {
        if (
            error instanceof Error &&
            "code" in error &&
            error.code === "EADDRINUSE"
        ) {
            const duration = 2000;
            let left = 5;
            left--;

            this.logger.warn(`Port ${this.port} already in use`);

            this.port = (this.port / 1000 + 1) * 1000;

            this.logger.warn(
                `Trying to restart the server on port ${this.port}... attempts left ${left} `,
            );

            if (left !== 0) {
                setTimeout(() => this.server.listen(this.port), duration);
            } else {
                this.server.close(() => {
                    this.logger.fatal(`Server is shutting down`);
                    process.exit(0);
                });
            }
        }
    }

    public handleListen(): void {
        this.logger.info(`Server running on port ${this.port}`);
    }

    public bindListeners(actions: IServerAction[]): void {
        for (const { event, listener } of actions) {
            // this.logger.info(`[${method.toUpperCase()}] ${path}`);
            const handler = listener.bind(this);
            this.server.on(event, handler);
        }
    }

    public init(server: Server, port: number): void {
        this.server = server;
        this.port = port;
        this.bindListeners([
            { event: "listening", listener: this.handleListen },
            { event: "error", listener: this.handleError },
        ]);
    }
}
