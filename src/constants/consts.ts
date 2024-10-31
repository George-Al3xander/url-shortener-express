export const TYPES = {
    Application: Symbol.for("Application"),
    Logger: Symbol.for("Logger"),
    ExceptionFilter: Symbol.for("ExceptionFilter"),
    ServerEventsHandler: Symbol.for("ServerEventsHandler"),
    UrlController: Symbol.for("UrlController"),
    UrlService: Symbol.for("UrlService"),
    IdService: Symbol.for("IdService"),
    ConfigService: Symbol.for("ConfigService"),
    DatabaseService: Symbol.for("DatabaseService"),
    UrlRepository: Symbol.for("UrlRepository"),
};

export const DB_ENV_KEYS = [
    "API_KEY",
    "AUTH_DOMAIN",
    "PROJECT_ID",
    "STORAGE_BUCKET",
    "MESSAGING_SENDER_ID",
    "APP_ID",
];
