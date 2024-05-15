import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { GuardService } from './lib-shared/auth/guard.service';
import { AuthService } from './lib-shared/auth/auth.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppTopbarComponent,
    AppFooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
