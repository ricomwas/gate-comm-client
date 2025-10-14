import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component'

export const PROPDASH_ROUTE: Route[] = [
  {
    path: 'prop-dash',
    component: DashboardsComponent,
  },

  { path: '**', component: Page404Component },
];