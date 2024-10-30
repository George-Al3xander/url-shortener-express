import { Firestore } from "firebase/firestore";

export interface IDatabaseService {
    db: Firestore;
    connect(): void;
    disconnect(): void;
}
