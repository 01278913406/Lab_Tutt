import { Component, Injector } from '@angular/core';

import { User } from '../lib-shared/models/user';
import { AuthService } from '../lib-shared/auth/auth.service';
/**
 * Component thanh topbar
 * tutt2 17/05/2024
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.css'
})

export class AppTopbarComponent {
  isLogin: boolean = false;
  crrUser!: User | null;

  constructor(
    protected _injector: Injector,
    private _authService: AuthService,
  ) {
  }

  async ngOnInit() {
    //lấy thông tin người dùng đã đăng nhập
    this.getCurrentUser()
  }

  //lấy thông tin người dùng đã đăng nhập
  async getCurrentUser()
  {
    this.crrUser = await this._authService.getCurrentUser();
  }
}
