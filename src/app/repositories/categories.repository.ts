import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Repository } from "./repository";

export interface ICategory {
    name: string;
}

@Injectable()
export class CategoryRepository extends Repository<ICategory> {

    path: string = 'categories';

    constructor(firestore: AngularFirestore) {
        super(firestore);
    }

}