import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SweetAlertService} from "../sweetaleart/sweet-alert.service";
import {TokenService} from "../tokenService/TokenService";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private sweetAlertService: SweetAlertService,
              private tokenService: TokenService) {}

  login(): void {
    localStorage.removeItem('jwt_token');
    this.authService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        const token = data.token;
        this.tokenService.setToken(token);
        localStorage.setItem('jwt_token', token.split(' ')[1]);
        this.sweetAlertService.showToast(
          "Login successful",
          "success");
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.sweetAlertService.showAlert(
          "Login failed",
          "Wrong username or password",
          "error");
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
