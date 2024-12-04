import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SweetAlertService} from "../sweetaleart/sweet-alert.service";
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  passwordType: string;
  loginEditForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private sweetAlertService: SweetAlertService,
              private fb: FormBuilder ) {


  }



  ngOnInit(): void {
    this.initializeLoginForm();
  }

  login(): void {

    this.clearLocalStorage();
    const username = this.loginEditForm.get('username')?.value;
    const password = this.loginEditForm.get('password')?.value;

    this.authService.login(username, password).subscribe({
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

        this.sweetAlertService.showToast(
          "Login successful",
          "success",
          2000);
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


  private clearLocalStorage() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username'); // Clear existing username
  }

  parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  togglePasswordType() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  private initializeLoginForm() {

    this.loginEditForm = this.fb.group({
      username: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
    });

  }
}
