import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Repository } from "./repository";

export interface IOutgoing {
    amount: number;
    date: Date;
    categorie: string;
}

@Injectable()
export class OutgoingRepository extends Repository<IOutgoing> {

    path: string = 'outgoing';

    constructor(firestore: AngularFirestore) {
        super(firestore);
    }

}