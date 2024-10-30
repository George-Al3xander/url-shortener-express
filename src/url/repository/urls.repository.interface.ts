import { UrlEntity } from "@/url";

export interface IUrlRepository {
    create(url: string): Promise<UrlEntity | undefined>;
    find(id: string): Promise<UrlEntity | undefined>;
}
