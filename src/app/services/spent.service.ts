import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { ConfigRepository } from "../repositories/config.repository";
import { IOutgoing, OutgoingRepository } from "../repositories/outgoing.repository";
import { IListOptions } from "../repositories/repository";

@Injectable()
export class SpentService {

    private today = new Date();

    constructor(
        private readonly configRepository: ConfigRepository,
        private readonly outgoingRepository: OutgoingRepository
    ) {
        this.today.setHours(0);
    }

    getTodaySpent() {
        const options: IListOptions = {
            limit: 4,
            where: {
                fieldPath: 'date',
                opStr: '>',
                value: this.today
            },
            orderBy: {
                fieldPath: 'date',
                direction: 'desc'
            }
        };
        return this.outgoingRepository.list(options);
    }

    getPastDaysSpent() {
        const options: IListOptions = {
            where: {
                fieldPath: 'date',
                opStr: '<',
                value: this.today
            }
        };
        return this.outgoingRepository.list(options);
    }

    add(amount: number, category: string) {
        const data = {
            amount: amount,
            date: new Date(),
            categorie: category
        };
        this.outgoingRepository.insert(data);
    }

    getMonthSpent(): Observable<IOutgoing[]> {
        return this.configRepository.get().pipe(
            map(config => config.dueDay),
            map(dueDay => {
                const firstDay = new Date();
                firstDay.setMonth(firstDay.getMonth() -1)
                firstDay.setDate(dueDay +1);
                firstDay.setHours(0);
                return firstDay;
            }),
            map(firstDay => {
                const options: IListOptions = {
                    where: {
                        fieldPath: 'date',
                        opStr: '>',
                        value: firstDay
                    }
                };
                return options;
            }),
            mergeMap(options => this.outgoingRepository.list(options))
        );

    }

}