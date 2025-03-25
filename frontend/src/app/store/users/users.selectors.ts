import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state
);

export const addUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);