import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { EventEmitterService } from '../../lib-shared/services/event-emitter.service';
import { AuthService } from '../../lib-shared/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../lib-shared/models/user';
import { Utilities } from '../../lib-shared/classes/Utilities';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooterComponent implements OnInit, OnDestroy {
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
    if (!this.crrUser) {
      this.crrUser = await this._authService.getCurrentUser();
    }
  }

  //kiểm tra object null
  isNullOrEmpty(obj: any): boolean {
    return Utilities.isNullOrEmpty(obj);
  }
}
