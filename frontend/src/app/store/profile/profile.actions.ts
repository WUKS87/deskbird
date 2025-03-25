import { createAction, props } from '@ngrx/store';
import { AuthCredentials } from '../../models/auth.model';

export const setProfileRole = createAction(
  '[Profile] Set Profile',
  props<{ credentials: AuthCredentials }>()
);
export const setProfileRoleSuccess = createAction(
  '[Profile] Set Profile Success',
  props<{ role: string }>()
);

export const clearProfile = createAction(
  '[Profile] Clear Profile'
);