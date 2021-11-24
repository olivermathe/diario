import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    data: { animation: 'LoginPage' },
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    data: { animation: 'HomePage' },
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthService]
  },
  {
    path: 'extrato',
    data: { animation: 'MonthPage' },
    loadChildren: () => import('./pages/month/month.module').then(m => m.MonthModule),
    canActivate: [AuthService]
  },
  {
    path: 'dashboard',
    data: { animation: 'DashboardPage' },
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
