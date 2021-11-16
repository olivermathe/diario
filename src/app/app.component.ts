import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUpdateService } from './app.update.service';

interface IConfig {
  limit: number;
  dueDay: number;
}

interface IOutgoing {
  amount: number;
  date: Date;
  categorie: string;
}

interface ICategorie {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diario';
  amount: string = '';
  categorie: string = 'Outros';
  today = new Date();
  formatterCurrency = (value: number): string => `R$ ${value}`;
  parserCurrency = (value: string): string => value.replace('R$ ', '').replace(',', '.');

  limit: Observable<number> = of(0);
  average: Observable<number> = of(0);
  config: Observable<IConfig[]> = of([]);
  outgoing: Observable<IOutgoing[]> = of([]);
  categories: Observable<ICategorie[]> = of([]);

  constructor(
    private firestore: AngularFirestore,
    private appUpdateService: AppUpdateService
  ) {
    appUpdateService.start();
    this.today.setHours(0);
    this.config = this.firestore.collection<IConfig>('config').valueChanges();
    this.categories = this.firestore.collection<ICategorie>('categories').valueChanges();
    this.getOutgoing();
    this.getLimit();
    this.getAverage();
  }

  getOutgoing() {
    this.outgoing = this.firestore.collection<IOutgoing>(
      'outgoing',
      ref => ref.where('date', '>', this.today).orderBy('date', 'desc').limit(4)
    ).valueChanges();
  }

  getLimit() {
    const outgoing$ = this.firestore.collection<IOutgoing>(
      'outgoing',
      ref => ref.where('date', '<', this.today)
    ).valueChanges();
    this.limit = combineLatest([this.config, outgoing$]).pipe(
      map(([config, outgoing]) => config[0].limit - outgoing.map(item => item.amount).reduce((prev, curr) => prev + curr, 0))
    );
  }

  getAverage() {
    this.average = combineLatest([this.config, this.limit, this.outgoing]).pipe(
      map(([config, limit, outgoing]) => {
        const todaySpent = outgoing.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
        if (this.today.getDate() === config[0].dueDay) {
          return limit - todaySpent;
        } else if (this.today.getDate() < config[0].dueDay) {
          const days = (config[0].dueDay - this.today.getDate() + 1);
          return (limit / days) - todaySpent;
        } else {
          const dueDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, config[0].dueDay);
          const days = Math.ceil(((dueDate.getTime() - this.today.getTime()) / (1000 * 3600 * 24))) + 1;
          return (limit / days) - todaySpent;}
      })
    );
  }

  addOutgoing() {
    this.firestore.collection<IOutgoing>('outgoing').add({
      amount: parseFloat(this.amount),
      date: new Date(),
      categorie: this.categorie
    });
    this.amount = '';
  }

}
