import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerBootstrapModule } from 'ngx-daterangepicker-bootstrap';
import { provideDaterangepickerLocale } from 'ngx-daterangepicker-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AuthService } from './lib-shared/auth/auth.service';
import { HomeComponent } from './home/home.component';
import { UsersService } from './lib-shared/services/users.service';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppTopbarComponent,
    AppFooterComponent,
    HomeComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxDaterangepickerBootstrapModule
  ],
  providers: [
    AuthService,
    UsersService,
    provideClientHydration(),
    provideDaterangepickerLocale({
      separator: ' - ',
      applyLabel: 'Okay',
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
