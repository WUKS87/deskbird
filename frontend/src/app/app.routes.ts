import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UsersListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'list', component: UsersListComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
