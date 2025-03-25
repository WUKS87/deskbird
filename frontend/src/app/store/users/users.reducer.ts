import { createReducer, on } from '@ngrx/store';
import { initialUsersState, UsersState } from './users.state';
import { addUserError, addUserSuccess, clearUsers, deleteUser, editUser, editUserSuccess, getUsersSuccess } from './users.actions';

export const usersReducer = createReducer(
  initialUsersState,
  on(getUsersSuccess, (state: UsersState, { users }) => ({ ...state, users })),

  on(addUserSuccess, (state: UsersState, { user }) => ({ ...state, users: [...state.users, user] })),
  on(addUserError, (state: UsersState, { error }) => ({ ...state, error })),
  
  on(editUserSuccess, (state: UsersState, { user }) => ({ ...state, users: state.users.map(u => u.id === user.id ? user : u) })),
  
  on(deleteUser, (state: UsersState, { id }) => ({ ...state, users: state.users.filter(user => user.id !== id) })),
  on(clearUsers, () => initialUsersState)
);
