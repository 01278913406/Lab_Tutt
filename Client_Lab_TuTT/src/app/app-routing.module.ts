import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './lib-shared/auth/guard.service';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/nguoi-dung', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'nguoi-dung', component: UserListComponent, canActivate: [GuardService] },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(mod => mod.ErrorModule)
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
