import { IConfigService } from "@/config/config.service.interface";
import { TYPES } from "@/constants/consts";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { Logger } from "tslog";

@injectable()
export class ConfigService implements IConfigService {
    private config!: DotenvParseOutput;

    constructor(@inject(TYPES.Logger) private readonly logger: Logger) {
        const { error, parsed }: DotenvConfigOutput = config();
        if (error) {
            this.logger.error(`Failed to read environment file!`);
        } else {
            this.logger.info("Environment file successfully read!");
            this.config = parsed as DotenvParseOutput;
        }
    }

    get<T extends string | number>(key: string): T {
        return this.config[key] as T;
    }
}
