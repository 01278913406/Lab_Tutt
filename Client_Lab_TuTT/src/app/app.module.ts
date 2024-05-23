import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { AppFooterComponent } from './shared/app-footer/app-footer.component';
import { AuthService } from './lib-shared/auth/auth.service';
import { HomeComponent } from './home/home.component';
import { UsersService } from './lib-shared/services/users.service';
import { UserListComponent } from './user-list/user-list.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SelectDropdownComponent } from './shared/select-dropdown/select-dropdown.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { UserEditComponent } from './user-list/user-edit/user-edit.component';
import { DateInputComponent } from './shared/date-input/date-input.component';
import { AppTopbarComponent } from './shared/app-topbar/app-topbar.component';
import { DatePickerCalendarComponent } from './shared/datepicker/datepicker-calendar/date-picker-calendar.component';
import { DatePickerComponent } from './shared/datepicker/datepicker-component/date-picker.component';
import { AuthorizationIntercepter } from './lib-shared/intercepters/authorization-intercepter';



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
    ToastComponent,
    ConfirmDialogComponent,
    UserEditComponent,
    DateInputComponent,
    DatePickerCalendarComponent,
    DatePickerComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationIntercepter,
      multi: true
    },
    AuthService,
    UsersService,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
