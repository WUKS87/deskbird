import { createAction, props } from '@ngrx/store';
import { AddUser, User } from '../../models/users.model';

export const getUsers = createAction(
  '[Users] Get Users'
);
export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: User[] }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: AddUser }>()
);
export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User }>()
);
export const addUserError = createAction(
  '[Users] Add User Error',
  props<{ error: string }>()
);

export const editUser = createAction(
  '[Users] Edit User',
  props<{ user: User }>()
);
export const editUserSuccess = createAction(
  '[Users] Edit User Success',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);

export const clearUsers = createAction(
  '[Users] Clear Users'
);