import { Component, Inject, Injector, NgModule, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../lib-shared/services/users.service';
import { AuthService } from '../../lib-shared/auth/auth.service';
import { ToastComponent } from '../toast/toast.component';
/**
 * Component login
 * tutt2 5/17/2024 created
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  errorMessage: string = "";
  passwordFieldType: string = 'password';  //type để ẩn hiện
  objUserLogin: any = {
    username: '',
    password: '',
  };

  formGroup: FormGroup = new FormGroup({});
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    protected _injector: Injector,
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _authService: AuthService
  ) {

    this.formGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.onCheckUserLogin();
  }

  /**
   * Determines whether check user login on
   * tutt2 5/17/2024 created
   */
  onCheckUserLogin() {
    if (isPlatformBrowser(this.platformId)) {
      this._authService.getCurrentUser().then(rs => {
        if (rs) {
          window.location.href = "/home";
        }
      })
    }
  }

  /**
   * Determines whether submit login on
   * Determines whether check user login on
   */
  async onSubmitLogin() {
    if (this.formGroup.valid) {
      await this._usersService.Login(
        this.objUserLogin
      ).then(rs => {
        if (rs != undefined) {
          if (rs.status) {
            this._authService.saveAccessToken(rs.data, 300);
            window.location.href = "/nguoi-dung";
          }
          else {
            this.errorMessage = rs.message;
          }
        }
      }, error => {
        this.toastComponent.showToast('Warning', 'Hệ thống dịch vụ đăng nhập đang gặp sự cố!.');
      });
    }
    else {
      this.toastComponent.showToast('Warning', 'Vui lòng nhập thông tin đăng nhập.');
    }
  }

  /**
   * ẩn hiện password
   * Determines whether check user login on
   */
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
