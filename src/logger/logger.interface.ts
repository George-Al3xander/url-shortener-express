export default interface ILogger {
    logger: unknown;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    fatal(...args: unknown[]): void;
}
