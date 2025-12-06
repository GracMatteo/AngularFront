import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const AdminGuard: CanActivateFn = (route, state) => {

    let authService = inject(AuthService);

    let router = inject(Router);

    return authService.isAdmin().then((authentifie) => {
        if (authentifie) {
            console.log('admin access granted');
            return true;
        } else {
            console.log('admin access denied');
            router.navigate(['/home']);
            return false;
        }
    })
};
