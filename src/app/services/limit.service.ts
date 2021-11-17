import { Injectable } from "@angular/core";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigRepository } from "../repositories/config.repository";
import { IOutgoing } from "../repositories/outgoing.repository";
import { SpentService } from "./spent.service";

@Injectable()
export class LimitService {

    private today = new Date();

    constructor(
        private readonly spentService: SpentService,
        private readonly configRepository: ConfigRepository,
    ) {
        this.today.setHours(0);
    }

    getMonthLimit() {
        return combineLatest([this.configRepository.get(), this.spentService.getPastDaysSpent()]).pipe(
            map(([config, outgoing]) => [config.limit, this.sumMonthSpent(outgoing)]),
            map(([limit, monthSpent]) => limit - monthSpent)
        );
    }

    private sumMonthSpent(outgoing: IOutgoing[]) {
        return outgoing.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    }

    getDayLimit() {
        const dueDay$ = this.configRepository.get().pipe(
            map(config => config.dueDay)
        );
        const limit$ = this.getMonthLimit();
        const outgoing$ = this.spentService.getTodaySpent();
        return combineLatest([dueDay$, limit$, outgoing$]).pipe(
            map(([dueDay, limit, outgoing]) => {
                const todaySpent = outgoing.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
                if (this.today.getDate() === dueDay) {
                    return limit - todaySpent;
                } else if (this.today.getDate() < dueDay) {
                    const days = (dueDay - this.today.getDate() + 1);
                    return (limit / days) - todaySpent;
                } else {
                    const dueDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, dueDay);
                    const days = Math.ceil(((dueDate.getTime() - this.today.getTime()) / (1000 * 3600 * 24))) + 1;
                    return (limit / days) - todaySpent;}
            })
        );
    }

}