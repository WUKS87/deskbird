import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { deleteUser, getUsers } from '../store/users/users.actions';
import { selectUsers } from '../store/users/users.selectors';
import { map, Observable } from 'rxjs';
import { User } from '../models/users.model';
import { ButtonModule } from 'primeng/button';
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: 'app-users-list',
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    AddUserComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private store = inject(Store);

  public users: Observable<User[]> | undefined;
  public cols = [
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' }
  ];

  ngOnInit(): void {
    this.store.dispatch(getUsers());

    this.users = this.store.select(selectUsers).pipe(
      map((state) => state.users)
    );
  }

  editUser(user: User, userModal: AddUserComponent) {
    userModal.openForEdit(user);
  }

  deleteUser(user: User): void {
    this.store.dispatch(deleteUser({ id: user.id }));
  }
}
