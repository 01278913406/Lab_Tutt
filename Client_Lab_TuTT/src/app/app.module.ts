import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AuthService } from './lib-shared/auth/auth.service';
import { HomeComponent } from './home/home.component';
import { UsersService } from './lib-shared/services/users.service';
import { UserListComponent } from './user-list/user-list.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SelectDropdownComponent } from './shared/select-dropdown/select-dropdown.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { UserEditComponent } from './user-list/user-edit/user-edit.component';
import { DateInputComponent } from './shared/date-input/date-input.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppTopbarComponent,
    AppFooterComponent,
    HomeComponent,
    UserListComponent,
    PaginationComponent,
    SelectDropdownComponent,
    DatepickerComponent,
    ToastComponent,
    ConfirmDialogComponent,
    UserEditComponent,
    DateInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    UsersService,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
