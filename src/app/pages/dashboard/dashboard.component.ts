import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { EMPTY, Observable } from 'rxjs';
import { IOutgoing } from 'src/app/repositories/outgoing.repository';
import { SpentService } from 'src/app/services/spent.service';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public options: ChartOptions = {
    legend: {
      position: 'bottom',
      fullWidth: true,
      align: 'start',
      labels: {
        fontSize: 20,
      }
    },
    aspectRatio: 1,
    responsive: true,
  };
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  
  monthSpent: Observable<IOutgoing[]> = EMPTY;

  constructor(private spentService: SpentService) {
    this.monthSpent = this.spentService.getMonthSpent();
    this.createChart();
  }

  createChart() {
    this.monthSpent.subscribe(monthSpent => {
      const data: {label: string, value: number}[] = [];
      monthSpent.forEach(outgoing => {
        const set = data.find(set => set.label === outgoing.categorie);
        if(!set) {
          data.push({label: outgoing.categorie, value: outgoing.amount});
        } else {
          set.value += outgoing.amount;
        }
      });
      console.log(data);
      this.doughnutChartLabels = data.map(set => set.label);
      this.doughnutChartData = [data.map(set => parseFloat(set.value.toFixed(2)))];
    });
  }

}
