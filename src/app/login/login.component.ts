import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SweetAlertService} from "../sweetaleart/sweet-alert.service";
import {TokenService} from "../tokenService/TokenService";
import jwt_decode from 'jwt-decode';


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
    localStorage.removeItem('username'); // Clear existing username

    this.authService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        const token = data.token;
        const jwtToken = token.split(' ')[1];
        localStorage.setItem('jwt_token', jwtToken);

        try {
          // Decode the token to extract the 'sub' field
          const decodedToken: any = this.parseJwt(jwtToken);
          console.log("Decoded token:", decodedToken);
          const usernameFromToken = decodedToken.sub; // Extract 'sub' field
          localStorage.setItem('username', usernameFromToken);
        } catch (error) {
          console.error('Failed to decode token:', error);
        }

        this.sweetAlertService.showToast("Login successful", "success");
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.sweetAlertService.showAlert(
          "Login failed",
          "Wrong username or password",
          "error"
        );
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

  parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
