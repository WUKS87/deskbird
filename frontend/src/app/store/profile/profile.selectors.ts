import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectUserRole = createSelector(
  selectProfileState,
  (state: ProfileState) => state.role
);
