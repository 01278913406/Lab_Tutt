import { Component, Injector, NgModule } from '@angular/core';

import { UsersService } from '../lib-shared/services/users.service';
import { AuthService } from '../lib-shared/auth/auth.service';
/**
 * Component login
 * tutt2 5/17/2024 created
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  errorMessage: string = "";
  passwordFieldType: string = 'password';
  objUserLogin: any = {
    username: '',
    password: '',
  };

  constructor(
    protected _injector: Injector,
    private _usersService: UsersService,
    private _authService: AuthService
  ) {
  }

  async ngOnInit() {
     this.onCheckUserLogin();
  }

  /**
   * Determines whether check user login on
   * tutt2 5/17/2024 created
   */
   onCheckUserLogin() {
    if (this._authService.getCurrentUser() != null)
      window.location.href = "/home";
  }

  /**
   * Determines whether submit login on
   * Determines whether check user login on
   */
  async onSubmitLogin() {
    await this._usersService.Login(
      this.objUserLogin
    ).then(rs => {
      if (rs != undefined) {
        if (rs.status) {
          this._authService.saveAccessToken(rs.data, 30);
          window.location.href = "/nguoi-dung";
        }
        else {
          this.errorMessage = rs.message;
        }
      }
    });
  }

  /**
   * Toggles password visibility
   * Determines whether check user login on
   */
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
