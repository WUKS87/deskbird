import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectUserRole } from '../store/profile/profile.selectors';

export const loginGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUserRole).pipe(
    map(role => {
      if (role) {
        return router.createUrlTree(['/list']);
      }
      
      return true;
    })
  );
};
