import { Component, Inject, Injector, NgModule, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../lib-shared/auth/auth.service';
import { ToastComponent } from '../toast/toast.component';
import { EventEmitterService } from '../../lib-shared/services/event-emitter.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../lib-shared/models/user';

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

  formGroup: FormGroup = new FormGroup({});
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    protected _injector: Injector,
    private _router: Router,
    private _eventEmitterService: EventEmitterService,
    private _formBuilder: FormBuilder,
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
          this._router.navigate(['/nguoi-dung']);
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
      await this._authService.Login(
        this.formGroup.value
      ).then(rs => {
        if (rs != undefined) {
          if (rs.status) {
            this.emitEventLogin(rs.data.token);
            this._authService.saveAccessToken(rs.data);
            this._router.navigate(['/nguoi-dung']);
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
      this.errorMessage = "Vui lòng nhập thông tin đăng nhập.";
    }
  }

  //truyền thông tin đăng nhập vào AppTopbarComponent để hiển thị thông tin người dùng
  emitEventLogin(token: string): void {
    const claims: any = jwtDecode(token);
    if (claims) {
      const objUser: any = {
        username: claims.unique_name,
        fullName: claims.given_name,
        email: claims.email,
        gender: claims.gender,
      };
      this._eventEmitterService.emitEventLogin(objUser);
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
