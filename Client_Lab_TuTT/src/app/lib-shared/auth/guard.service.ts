import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

export const GuardService: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  // if (authService.isAuthenticated()) {
  if (localStorageService.getUser() != null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};