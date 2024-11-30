import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  login(): void {
    localStorage.removeItem('jwt_token');
    this.authService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        const token = data.token;
        localStorage.setItem('jwt_token', token.split(' ')[1]);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Login failed!", err);
        alert('Login failed!');
      },
    });
  }


 /* loadUsers() {
    this.authService.loadUserData().subscribe({
      next:(data)=>{
        console.log("Data"+ data)
      },
      error: (err) => {
        console.log(err);
        alert('Loading data failed');
      },
    })
  }*/
}
