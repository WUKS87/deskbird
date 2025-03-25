import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UsersListComponent } from './users-list/users-list.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent, canActivate: [loginGuard] },
  { path: 'list', component: UsersListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
