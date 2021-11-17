import { Injectable } from "@angular/core";
import { OutgoingRepository } from "../repositories/outgoing.repository";
import { IListOptions } from "../repositories/repository";

@Injectable()
export class SpentService {

    private today = new Date();

    constructor(private readonly outgoingRepository: OutgoingRepository) {
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

}