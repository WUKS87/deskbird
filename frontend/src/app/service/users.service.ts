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

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  addUser(user: AddUser): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/create`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/update`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}