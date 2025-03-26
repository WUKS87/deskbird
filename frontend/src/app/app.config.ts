import { ApplicationConfig, provideZoneChangeDetection, isDevMode, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/http-interceptor';
import { provideStore } from '@ngrx/store';
import { profileReducer } from './store/profile/profile.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects } from './store/profile/profile.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthService } from './service/auth.service';
import { usersReducer } from './store/users/users.reducer';
import { UsersEffects } from './store/users/users.effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    providePrimeNG({
        theme: {
            preset: Aura
        },
        inputStyle: 'outlined',
    }),
    provideStore({ profile: profileReducer, users: usersReducer }),
    provideEffects([ProfileEffects, UsersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAppInitializer(() => {
        const authService = inject(AuthService);

        return authService.restoreSession();
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};