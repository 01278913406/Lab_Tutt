import { Component, Injector } from '@angular/core';
import { LocalStorageService } from '../lib-shared/auth/local-storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.css'
})
export class AppTopbarComponent {
   isLogin: boolean= false;
   
   constructor(
    protected _injector: Injector,
    private _LocalStorageService: LocalStorageService
  ) {
  }

  async ngOnInit() {
  }
  async CheckUserLogin()
  {
    if(this._LocalStorageService.getUser() != null)
      this.isLogin = true;
  }
}
