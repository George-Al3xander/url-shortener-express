import { inject, injectable } from "inversify";

import { IServiceID, IUrlService, UrlDto, UrlEntity } from "@/url";

import { TYPES } from "@/constants/consts";

@injectable()
export class UrlService implements IUrlService {
    constructor(
        @inject(TYPES.IdService) private readonly idService: IServiceID,
    ) {}
    shortenUrl({ url }: UrlDto): UrlEntity {
        return new UrlEntity(url, this.idService);
    }
}
