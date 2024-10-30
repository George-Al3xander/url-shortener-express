import { doc, getDoc, setDoc } from "firebase/firestore";
import { inject, injectable } from "inversify";

import { ILogger } from "@/logger";

import { IDatabaseService } from "@/db";

import { IServiceID, IUrlRepository, UrlEntity } from "@/url";

import { TYPES } from "@/constants/consts";

@injectable()
export class UrlRepository implements IUrlRepository {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.DatabaseService) private dbService: IDatabaseService,
        @inject(TYPES.IdService) private idService: IServiceID,
    ) {}

    async create(url: string): Promise<UrlEntity | undefined> {
        const db = this.dbService.db;
        const newUrl = new UrlEntity(url, this.idService);
        const { shorten_id, original_url } = newUrl;
        try {
            const docRef = doc(db, "urls", shorten_id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case

                await setDoc(doc(db, "urls", shorten_id), {
                    shorten_id,
                    original_url,
                });
                return newUrl;
            }
        } catch (e) {
            console.log(e);
            this.loggerService.error("Failed to create shorten url: ", url);
            return undefined;
        }
    }

    async find(id: string): Promise<UrlEntity | undefined> {
        const db = this.dbService.db;

        try {
            const docRef = doc(db, "urls", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as UrlEntity;
            }
        } catch (e) {
            console.log(e);
            this.loggerService.error("Failed to get shorten url: ", id);
            return undefined;
        }
    }
}
