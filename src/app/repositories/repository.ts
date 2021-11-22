import { AngularFirestore, CollectionReference, DocumentData, Query, QueryFn } from "@angular/fire/compat/firestore";
import { fromEvent, merge, } from "rxjs";
import { map } from "rxjs/operators";

export interface IWhere {
    fieldPath: string,
    opStr: "<" | "<=" | "==" | ">" | ">=",
    value: any
}

export interface IOrderBy {
    fieldPath: string,
    direction: 'asc' | 'desc'
}

export interface IListOptions {
    where?: IWhere,
    orderBy?: IOrderBy,
    limit?: number
}

export class Repository<T> {

    path: string = '';
    connectionStatus: boolean = true;

    constructor(private readonly firestore: AngularFirestore) {
        this.checkConnectionStatus();
    }

    list(options?: IListOptions) {
        let queryFn: QueryFn | undefined = undefined;
        if (options) {
            queryFn = this.queryFnFactory(options);
        }
        return this.firestore.collection<T>(this.path, queryFn).valueChanges();
    }

    insert(data: T) {
        return this.firestore.collection<T>(this.path).add(data);
    }

    private queryFnFactory(options: IListOptions) {
        return (ref: CollectionReference<DocumentData>): Query<DocumentData> => {
            let queryFn;
            if (options.where) {
                const opStr: any = options.where.opStr;
                queryFn = (queryFn || ref).where(options.where.fieldPath, opStr, options.where.value);
            }
            if (options.orderBy) {
                queryFn = (queryFn || ref).orderBy(options.orderBy.fieldPath, options.orderBy.direction);
            }
            if (options.limit) {
                queryFn = (queryFn || ref).limit(options.limit);
            }
            return queryFn as Query<DocumentData>;
        }
    }

    checkConnectionStatus() {
        merge<boolean>(
          fromEvent(window, 'offline').pipe(map(() => false)),
          fromEvent(window, 'online').pipe(map(() => true)),
        ).subscribe(connectionStatus => {
            console.log('connectionStatus', connectionStatus);
            this.connectionStatus = connectionStatus;
        });
    }

}