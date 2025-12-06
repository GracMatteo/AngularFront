import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';
export const AuthGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);

  let router = inject(Router);

  return authService.isLogged().then((authentifie) => {
    if (authentifie) {
      console.log('access granted');
      return true;
    } else {
      console.log('access denied');
      router.navigate(['/home']);
      return false;
    }
  })
};
