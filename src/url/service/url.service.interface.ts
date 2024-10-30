import { UrlDto, UrlEntity } from "@/url";

export interface IUrlService {
    shortenUrl: (dto: UrlDto) => UrlEntity;
}
