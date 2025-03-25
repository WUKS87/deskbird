import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../store/profile/profile.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { clearUsers } from '../store/users/users.actions';
import { clearProfile } from '../store/profile/profile.actions';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUserRole).pipe(
    map(role => {
      if (role) {
        return true;
      } else {
        // Clear user state.
        store.dispatch(clearUsers());
        store.dispatch(clearProfile());

        return router.createUrlTree(['/auth']);
      }
    })
  );
};
