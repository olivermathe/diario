import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/diario', pathMatch: 'full' },
  {
    path: 'diario',
    data: { animation: 'HomePage' },
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'mensal',
    data: { animation: 'MonthPage' },
    loadChildren: () => import('./pages/month/month.module').then(m => m.MonthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
