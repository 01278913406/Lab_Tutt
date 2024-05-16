import { Component, Injector } from '@angular/core';
import { LocalStorageService } from '../lib-shared/auth/local-storage.service';
import { User } from '../lib-shared/models/user';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.css'
})
export class AppTopbarComponent {
  isLogin: boolean = false;
  crrUser!: User;
  constructor(
    protected _injector: Injector,
    private _LocalStorageService: LocalStorageService
  ) {
  }

  async ngOnInit() {
    // this.crrUser = await this._userService.getCurrentUser();
  }
  async CheckUserLogin() {
    if (this._LocalStorageService.getUser() != null)
      this.isLogin = true;
  }
}
