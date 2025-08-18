import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard/dashboard.component';


export const ADMIN_ROUTE: Route[] = [
  {
      path: 'dashboard',
      component: DashboardComponent,
  },
  { path: '**', component: Page404Component },
];