import { createAction, props } from '@ngrx/store';
import { AuthCredentials } from '../../models/auth.model';

export const setProfile = createAction(
  '[Profile] Set Profile',
  props<{ credentials: AuthCredentials }>()
);
export const setProfileSuccess = createAction(
  '[Profile] Set Profile Success',
  props<{ role: string }>()
);
export const setProfileError = createAction(
  '[Profile] Set Profile Error',
  props<{ error: string }>()
);

export const clearProfile = createAction(
  '[Profile] Clear Profile'
);