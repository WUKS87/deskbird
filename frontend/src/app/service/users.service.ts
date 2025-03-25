import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddUser, User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`, { withCredentials: true });
  }

  addUser(user: AddUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/create`, user, { withCredentials: true });
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/update`, user, { withCredentials: true });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${id}`, { withCredentials: true });
  }
}