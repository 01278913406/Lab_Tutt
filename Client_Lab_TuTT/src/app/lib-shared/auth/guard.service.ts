import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard để kiểm tra xác thực khi người dùng
 * click vào link được cấu hình trong routing
 */
export const GuardService: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUser != null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};