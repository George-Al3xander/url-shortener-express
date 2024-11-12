import { config } from "dotenv";
import { inject, injectable } from "inversify";
import { Logger } from "tslog";

import { IConfigService } from "@/config/config.service.interface";

import { TYPES } from "@/constants/consts";

config();

@injectable()
export class ConfigService implements IConfigService {
    private readonly config!: NodeJS.ProcessEnv;

    constructor(@inject(TYPES.Logger) private readonly logger: Logger) {
        try {
            this.config = process.env;
            this.logger.info(
                "[ConfigService] Environment file successfully read!",
            );
        } catch (_e) {
            this.logger.error(
                `[ConfigService] Failed to read environment file!`,
            );
        }
    }

    get<T extends string | number>(key: string): T {
        return this.config[key] as T;
    }
}
