import { Server } from "http";

export interface IServerAction {
    event: string;
    listener: (args: unknown) => void;
}

export interface IServerEventsHandler {
    bindListeners(actions: IServerAction[]): void;
    init(server: Server, port: number): void;
}
