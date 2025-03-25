import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { setProfileRoleSuccess } from '../store/profile/profile.actions';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store
) {}

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }

  restoreSession() {
    const sessionData = localStorage.getItem('deskbirdUserSession');

    if (sessionData) {
      const { role, expires } = JSON.parse(sessionData);
      const now = new Date().getTime();

      if (now < expires) {
        this.store.dispatch(setProfileRoleSuccess({ role }));
      } else {
        localStorage.removeItem('deskbirdUserSession');
      }
    }
  }

  logout() {
    localStorage.removeItem('deskbirdUserSession');
  }
}