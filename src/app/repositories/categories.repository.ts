import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { StorageService } from "../services/storage.service";
import { Repository } from "./repository";

export interface ICategory {
    name: string;
}

@Injectable()
export class CategoryRepository extends Repository<ICategory> {

    path: string = 'categories';

    constructor(firestore: AngularFirestore, storage: StorageService) {
        super(firestore, storage);
    }

}