import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component'

export const RESIDENTSDASH_ROUTE: Route[] = [
  {
    path: 'res-dash',
    component: DashboardsComponent,
  },

  { path: '**', component: Page404Component },
];