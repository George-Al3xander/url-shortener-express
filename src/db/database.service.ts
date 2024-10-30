import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { inject, injectable } from "inversify";

import { IConfigService } from "@/config";

import { ILogger } from "@/logger";

import { IDatabaseService } from "@/db";

import { DB_ENV_KEYS, TYPES } from "@/constants/consts";

@injectable()
export class DatabaseService implements IDatabaseService {
    db!: Firestore;
    config: { [key in (typeof DB_ENV_KEYS)[number]]: string };
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.ConfigService) private configService: IConfigService,
    ) {
        const config = DB_ENV_KEYS.map((key) => [
            key,
            this.configService.get(key),
        ]);
        this.config = Object.fromEntries(config);
        this.connect();
    }

    connect(): void {
        try {
            const firebase_app = initializeApp(this.config);
            this.db = getFirestore(firebase_app);
            this.loggerService.info(
                `[${this.constructor.name}] Database connected successfully.`,
            );
        } catch (_e) {
            this.loggerService.error(
                `[${this.constructor.name}] Failed to connect to database`,
            );
        }
    }

    disconnect(): void {}
}
