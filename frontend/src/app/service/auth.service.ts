import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

interface LoginCredentials {
    email: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
        tap((response: any) => {
            localStorage.setItem('token', response.token);
        })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}