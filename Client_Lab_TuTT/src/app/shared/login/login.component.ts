import { ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../lib-shared/auth/auth.service';
import { ToastComponent } from '../toast/toast.component';
import { EventEmitterService } from '../../lib-shared/services/event-emitter.service';
import { jwtDecode } from 'jwt-decode';


/**
 * Component login
 * tutt2 5/17/2024 created
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string = "";
  passwordFieldType: string = 'password';  //type để ẩn hiện

  images = [
    'https://taxi.binhanhcorp.com/PublicAll/2024/Tet/Gps/ba_hpny_duong_lich.jpg',
    'https://taxi.binhanhcorp.com/PublicAll/2021/TetAmLich/chuc_mung_nam_moi.png',
    'https://taxi.binhanhcorp.com/PublicAll/2022/Staxi_Tinh_nang_moi_2022_01_11.jpg',
    'https://taxi.binhanhcorp.com/PublicAll/2023/zalo_oa.jpg'
  ];
  currentImageIndex = 0;
  private intervalId: any;

  formGroup: FormGroup = new FormGroup({});
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    protected _injector: Injector,
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private _eventEmitterService: EventEmitterService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {

    this.formGroup = this._formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{3,16}$/)]],
      password: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.onCheckUserLogin();
    this.startImageSlider()
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageSlider() {
    try {
      if (isPlatformBrowser(this.platformId)) {
        this.intervalId = setInterval(() => {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
          this.cdr.detectChanges();  // Manually trigger change detection
        }, 10000); // Change image every 10 seconds
      }
    } catch (error) {
      console.error('Error in setInterval:', error);
    }
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
            this.toastComponent.showToast('Warning', rs?.message ? rs?.message : "Dịch vụ đăng nhập người dùng đang gặp sự cố!");
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
