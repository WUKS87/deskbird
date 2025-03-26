import { createReducer, on } from '@ngrx/store';
import { initialProfileState, ProfileState } from './profile.state';
import { clearProfile, setProfileError, setProfileSuccess } from './profile.actions';

export const profileReducer = createReducer(
  initialProfileState,
  on(setProfileSuccess, (state: ProfileState, { role }) => ({ ...state, role })),
  on(setProfileError, (state: ProfileState, { error }) => ({ ...state, error })),
  on(clearProfile, () => initialProfileState)
);
