import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { PropertiesDashComponent } from './properties-dash/properties-dash.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ListUsersComponent } from './list-users/list-users.component';


export const PROPERTIES_ROUTE: Route[] = [
  {
    path: 'property-dash',
    component: PropertiesDashComponent,
  },
  {
    path: 'create-users',
    component: CreateUsersComponent,
  },
  {
    path: 'list_users',
    component: ListUsersComponent,
  },
  { path: '**', component: Page404Component },
];