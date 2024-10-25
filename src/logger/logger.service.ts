import { injectable } from "inversify";
import { Logger } from "tslog";

import { ILogger } from "@/logger";

@injectable()
export default class LoggerService implements ILogger {
    logger: Logger;
    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: "hidden",
            displayFunctionName: false,
        });
    }
    info(args: string | Error): void {
        this.logger.info(args);
    }

    error(args: string | Error): void {
        this.logger.error(args);
    }

    warn(args: string | Error): void {
        this.logger.warn(args);
    }

    fatal(args: string | Error): void {
        this.logger.fatal(args);
    }
}
