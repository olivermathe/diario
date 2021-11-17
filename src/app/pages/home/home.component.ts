import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryRepository, ICategory } from 'src/app/repositories/categories.repository';
import { IOutgoing, OutgoingRepository } from 'src/app/repositories/outgoing.repository';
import { LimitService } from 'src/app/services/limit.service';
import { SpentService } from 'src/app/services/spent.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  amount: string = '';
  category: string = 'Outros';
  formatterCurrency = (value: number): string => `R$ ${value}`;
  parserCurrency = (value: string): string => value.replace('R$ ', '').replace(',', '.');

  limit: Observable<number> = of(0);
  outgoing: Observable<IOutgoing[]> = of([]);
  categories: Observable<ICategory[]> = of([]);

  constructor(
    private categoryRepository: CategoryRepository,
    private outgoingRepository: OutgoingRepository,
    private spentService: SpentService,
    private limitService: LimitService
  ) {
    this.limit = this.limitService.getDayLimit();
    this.categories = this.categoryRepository.list();
    this.outgoing = this.spentService.getTodaySpent();
  }

  addOutgoing() {
    this.spentService.add(parseFloat(this.amount), this.category);
    this.amount = '';
  }

}
