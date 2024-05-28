import { Component, Injector, OnInit } from '@angular/core';
import { User } from '../../lib-shared/models/user';
import { AuthService } from '../../lib-shared/auth/auth.service';
import { EventEmitterService } from '../../lib-shared/services/event-emitter.service';
import { Subscription } from 'rxjs';


/**
 * Component thanh topbar
 * tutt2 17/05/2024
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.css'
})

export class AppTopbarComponent implements OnInit {
  isLogin: boolean = false;
  crrUser!: User | null;
  private eventSubjectLogin: Subscription = new Subscription;

  constructor(
    protected _injector: Injector,
    private _eventEmitterService: EventEmitterService,
    private _authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.emitEventLogin();
    await this.getCurrentUser();
    console.log("crrUser",JSON.stringify(this.crrUser));
  }
  ngOnDestroy() {
    if (this.eventSubjectLogin) {
      this.eventSubjectLogin.unsubscribe();
    }
  }

  //dùng để truyền thông tin người dùng khi đăng nhập thành công trang login
  emitEventLogin(){
    this.eventSubjectLogin = this._eventEmitterService.eventLogin$.subscribe(event => {
      this.crrUser = event;
    });
  }
  //lấy thông tin người dùng đã đăng nhập
  async getCurrentUser() {
    this.crrUser = await this._authService.getCurrentUser();
  }

  //đăng xuất
  logout() {
    // Perform logout logic here
    // Clear user data from localStorage or any other storage
    this._authService.removeUser();
    window.location.href = "/login";
  }

  isNullOrEmpty(obj: any): boolean {
    return obj === null || obj === undefined || 
           (typeof obj === 'object' && Object.keys(obj).length === 0) || 
           (Array.isArray(obj) && obj.length === 0) || 
           (typeof obj === 'string' && obj.trim().length === 0);
  }
}
