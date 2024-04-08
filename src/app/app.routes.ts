import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: HomePageComponent,
  },

  {
    path: 'users',
    component: UsersListComponent,
  },
];
