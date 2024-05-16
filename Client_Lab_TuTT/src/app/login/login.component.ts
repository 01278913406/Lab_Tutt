import { Component, Injector, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../lib-shared/services/users.service';
import { LocalStorageService } from '../lib-shared/auth/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  passwordFieldType: string = 'password';
  objUserLogin: any = {
    username: '',
    password: '',
  };

  constructor(
    protected _injector: Injector,
    private _usersService: UsersService,
    private _LocalStorageService: LocalStorageService
  ) {
  }

  async ngOnInit() {
    if (this._LocalStorageService.isPlatformBrowser()) {
      // Access localStorage here
      const data = localStorage.getItem('cachedUser');
      console.log(data);
    }
    this.onCheckUserLogin();
  }

  async onCheckUserLogin(){
    if(this._LocalStorageService.getUser() != null)
          window.location.href = "/home";
  }
  async onSubmitLogin() {
    console.log("dữ liệu truyền vào xác thực", JSON.stringify(this.objUserLogin))
    await this._usersService.Login(
      this.objUserLogin
    ).then(rs => {
      if (rs != undefined) {
        if (rs.status) {
          this._LocalStorageService.saveUser(rs.data, 30);
          window.location.href = "/home";
        }
        else {
          this.errorMessage = rs.message;
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    // Implement authentication logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
