import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

import { User } from '../models/user';

/**
 * Guard để kiểm tra xác thực khi người dùng
 * click vào link được cấu hình trong routing
 */
export const GuardService: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Promise(async resolve => {
    await authService.getCurrentUser().then(rs => {
      console.log("kết quả trả về", rs)
      if (rs) {
        resolve(true);
        return ;
      }
      else {
        router.navigate(['/login']);
        resolve(false);
        return;
      }
    }).catch(error => {
      router.navigate(['/error/500']);
      resolve(false);
      return;
    });
  });
  //lấy người dùng đăng nhập hiện tại
  // authService.getCurrentUser().then(rs => {
  //   if (rs) {
  //     return true;
  //   }
  //   else {
  //     router.navigate(['/login']);
  //     return false;
  //   }
  // }).catch(error => {
  //   router.navigate(['/error/500']);
  //   return false;
  // });

  // if (await authService.getCurrentUser() != null) {
  //   return true;
  // } else {
  //   router.navigate(['/login']);
  //   return false;
  // }
};