import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { CreateResidentsComponent } from './create-residents/create-residents.component';
import { ResidentsDashComponent } from './residents-dash/residents-dash.component';
import { ListResidentsComponent } from './list-residents/list-residents.component';
import { CreateVisitComponent } from './create-visit/create-visit.component';



export const RESIDENTS_ROUTE: Route[] = [
  {
    path: 'resident-dash',
    component:ResidentsDashComponent,
  },
  {
    path: 'residents-signup',
    component: CreateResidentsComponent,
  },
  {
    path: 'resident-visit',
    component: CreateVisitComponent
  },
  {
    path: 'list_residents',
    component: ListResidentsComponent,
  },
  { path: '**', component: Page404Component },
];