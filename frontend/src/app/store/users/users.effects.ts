import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { UsersService } from "../../service/users.service";
import { addUser, addUserError, addUserSuccess, deleteUser, editUser, editUserSuccess, getUsers, getUsersSuccess } from "./users.actions";

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersService = inject(UsersService);

  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      exhaustMap(action =>
        this.usersService.getAllUsers().pipe(
          map(response => {
            return getUsersSuccess({ users: response })
          })
        )
      )
    )
  );

  // Add new user effect
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      exhaustMap(action =>
        this.usersService.addUser(action.user).pipe(
          map(response => addUserSuccess({ user: response })),
          catchError(err => of(addUserError({ error: err.error.message })))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      exhaustMap(action =>
        this.usersService.editUser(action.user).pipe(
          map(response => editUserSuccess({ user: response })),
          catchError(err => of(addUserError({ error: err.error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      exhaustMap(action =>
      {
        console.log('action', action);
        return this.usersService.deleteUser(action.id).pipe(
          map(() => getUsers())
        )
      }
      )
    )
  );
}