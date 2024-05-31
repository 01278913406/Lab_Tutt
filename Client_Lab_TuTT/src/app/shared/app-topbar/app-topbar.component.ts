import { Component, Injector, OnInit } from '@angular/core';
import { User } from '../../lib-shared/models/user';
import { AuthService } from '../../lib-shared/auth/auth.service';
import { Utilities } from '../../lib-shared/classes/Utilities';
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
    await this.getCurrentUser();
  }
  
  ngOnDestroy() {
    if (this.eventSubjectLogin) {
      this.eventSubjectLogin.unsubscribe();
    }
  }

  //lấy thông tin người dùng đã đăng nhập
  async getCurrentUser() {
    this.eventSubjectLogin = this._eventEmitterService.eventLogin$.subscribe(event => {
      this.crrUser = event;
    });
    if (!this.crrUser)
      this.crrUser = await this._authService.getCurrentUser();
  }

  //đăng xuất
  logout() {
    // Perform logout logic here
    // Clear user data from localStorage or any other storage
    this._authService.removeUser();
    window.location.href = "/login";
  }

  //kiểm tra object null
  isNullOrEmpty(obj: any): boolean {
    return Utilities.isNullOrEmpty(obj);
  }
}
