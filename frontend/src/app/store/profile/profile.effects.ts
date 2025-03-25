import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { setProfileRole, setProfileRoleSuccess } from "./profile.actions";
import { AuthService } from "../../service/auth.service";
import { exhaustMap, map, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  profile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setProfileRole),
      exhaustMap(action =>
        this.authService.login(action.credentials).pipe(
          tap(response => {
            const expirationTime = new Date().getTime() + 3600000;

            localStorage.setItem('deskbirdUserSession', JSON.stringify({
              role: response.role,
              expires: expirationTime
            }));
          }),
          map(response => setProfileRoleSuccess({ role: response.role }))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setProfileRoleSuccess),
        tap(() => {
          this.router.navigate(['/list']);
        })
      ),
    { dispatch: false }
  );
}