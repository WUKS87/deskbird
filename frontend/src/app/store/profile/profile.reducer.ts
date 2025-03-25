import { createReducer, on } from '@ngrx/store';
import { initialProfileState, ProfileState } from './profile.state';
import { clearProfile, setProfileRoleSuccess } from './profile.actions';

export const profileReducer = createReducer(
  initialProfileState,
  on(setProfileRoleSuccess, (state: ProfileState, { role }) => ({ ...state, role })),
  on(clearProfile, () => initialProfileState)
);
