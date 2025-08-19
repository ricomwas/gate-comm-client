import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component'

export const STAFF_ROUTE: Route[] = [
  {
    path: 'staff-dash',
    component: DashboardsComponent,
  },

  { path: '**', component: Page404Component },
];