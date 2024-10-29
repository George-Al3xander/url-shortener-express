import { IsString, IsUrl } from "class-validator";

export class UrlDto {
    @IsUrl({}, { message: "The provided URL is invalid!" })
    @IsString({ message: "No URL provided!" })
    url!: string;
}
