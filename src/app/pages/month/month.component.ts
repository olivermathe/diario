import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { combineLatest, Observable, of, timer } from 'rxjs';
import { combineAll, map } from 'rxjs/operators';
import { LimitService } from 'src/app/services/limit.service';
import { SpentService } from 'src/app/services/spent.service';

interface ITimeline {
  amount: number;
  category: string;
  dayMonth: string;
}

@Component({
  selector: 'month-page',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent {
  
  limit: Observable<number> = of(0);
  timeline: ITimeline[] = [];
  totalSpent = 0;

  constructor(
    private readonly limitService: LimitService,
    private readonly spentService: SpentService
  ) {
    this.limit = this.getLimit();
  }

  getLimit() {
    return combineLatest(this.spentService.getMonthSpent(), this.limitService.getTotalMonthLimit()).pipe(
      map(([outgoing, limit]) => {
        let totalSpent = 0;
        const timelineList = outgoing.map(o => {
          const day = o.date.toDate().getDate().toString();
          const month = (o.date.toDate().getMonth() +1).toString();

          totalSpent = totalSpent + o.amount;

          const timeline: ITimeline = {
            amount: o.amount,
            dayMonth: day + '/' + month,
            category: o.categorie
          };
          return timeline;
        });
        this.totalSpent = totalSpent;
        this.timeline = timelineList;
        return limit - totalSpent;
      })
    )
  }

}
