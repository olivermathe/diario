import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Repository } from "./repository";

interface IConfig {
    limit: number;
    dueDay: number;
}

@Injectable()
export class ConfigRepository extends Repository<IConfig> {

    path: string = 'config';

    constructor(firestore: AngularFirestore) {
        super(firestore);
    }

    get(): Observable<IConfig> {
        return this.list().pipe(
            map(config => config[0])
        );
    }

}