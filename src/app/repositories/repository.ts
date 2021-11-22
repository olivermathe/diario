import { AngularFirestore, CollectionReference, DocumentData, Query, QueryFn } from "@angular/fire/compat/firestore";
import { fromEvent, merge, Observable } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";
import { StorageService } from "../services/storage.service";

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

    constructor(
        private readonly firestore: AngularFirestore,
        private readonly storage: StorageService
    ) {
        this.checkConnectionStatus();
    }

    list(options?: IListOptions) {
        let valueChanges: Observable<T[]>;
        const index = this.createIndex('list', options);
        let queryFn: QueryFn | undefined = undefined;
        if (options) {
            queryFn = this.queryFnFactory(options);
        }
        if (!this.connectionStatus) {
            debugger;
            valueChanges = this.storage.get(index) as Observable<T[]>;
        } else {
            valueChanges = this.firestore.collection<T>(this.path, queryFn).valueChanges().pipe(
                mergeMap(list => {
                    return this.storage.has(index).pipe(
                        map(has => {
                            if (!has) {
                                debugger;
                                this.storage.set(index, list);
                            }
                            return list;
                        })
                    )
                })
            );
        }
        return valueChanges.pipe(
            filter(value => value !== undefined)
        );
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

    private createIndex(method: string, options?: IListOptions) {
        let opt = 'NULL';
        if (options && options.where && options.where.value instanceof Date) {
            let _opt: IListOptions = { ...options, where: { ...options.where } };
            if (_opt && _opt.where) {
                _opt.where.value = _opt.where.value.toDateString();
                opt = JSON.stringify(_opt);
            }
        }
        const index = `${method}:${this.path}:${opt}`;
        console.log(options, index);
        return index;
    }

}