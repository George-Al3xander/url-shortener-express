import { injectable } from "inversify";
import ShortUniqueId from "short-unique-id";

import { IServiceID } from "@/url";

import "reflect-metadata";

@injectable()
export default class UrlIdService implements IServiceID {
    private generator: ShortUniqueId;
    constructor() {
        this.generator = new ShortUniqueId({ length: 10 });
    }
    public generate(): string {
        return this.generator.rnd();
    }
}
