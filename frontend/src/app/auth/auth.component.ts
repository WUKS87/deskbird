import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { Store } from '@ngrx/store';
import { setProfile } from '../store/profile/profile.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectProfileError } from '../store/profile/profile.selectors';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    MessageModule
  ],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);

  errorMessage$: Observable<string | null> = this.store.select(selectProfileError);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.password as string;

      // Dispatch the action to set the profile role.
      this.store.dispatch(setProfile({ credentials: { email, password } }));
    }
  }

}
