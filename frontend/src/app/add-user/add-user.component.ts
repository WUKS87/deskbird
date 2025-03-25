import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser, addUserSuccess, editUser, editUserSuccess } from '../store/users/users.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { addUsersError } from '../store/users/users.selectors';
import { CommonModule } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { User } from '../models/users.model';

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule,
    Dialog,
    ButtonModule,
    InputTextModule, 
    SelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);
  private actions$ = inject(Actions);

  isEditMode: WritableSignal<boolean> = signal(false);
  visible: WritableSignal<boolean> = signal(false);
  errorMessage$: Observable<string | null> = this.store.select(addUsersError);

  userRoles = [
    { name: 'Admin', code: 'admin' },
    { name: 'User', code: 'user' }
  ];

  addUserForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required]
  });

  private user: User | null = null;

  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType(addUserSuccess, editUserSuccess),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.visible.set(false);
        this.addUserForm.reset();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.addUserForm.invalid) return;

    const { email, role } = this.addUserForm.value;

    if (this.isEditMode() && this.user) {
      this.store.dispatch(editUser({ user: { ...this.user, email: email!, role: role ?? 'user' } }));
    } else {
      this.store.dispatch(addUser({ user: { email: email!, role: role ?? 'user' } }));
    }
  }

  // Method to be called from parent to open modal in edit mode.
  openForEdit(user: User) {
    this.user = user;
    this.isEditMode.set(true);
    this.addUserForm.patchValue({
      email: user.email,
      role: user.role
    });

    this.showDialog();
  }

  showDialog() {
    this.visible.set(true);
  }

  hideDialog() {
    this.visible.set(false);
    this.isEditMode.set(false);
    this.addUserForm.reset();
    this.user = null;
  }
}
