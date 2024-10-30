import { inject, injectable } from "inversify";

import { IServiceID } from "@/url/index";

import { TYPES } from "@/constants/consts";

@injectable()
export class UrlEntity {
    shorten_id: string;
    constructor(
        private readonly _original_url: string,
        @inject(TYPES.IdService) private readonly idService: IServiceID,
    ) {
        this.shorten_id = this.idService.generate();
    }

    get original_url(): string {
        return this._original_url;
    }
}