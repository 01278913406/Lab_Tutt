import { Component, NgModule  } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string= "";
  password: string= "";

  onSubmit() {
    // Implement authentication logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
