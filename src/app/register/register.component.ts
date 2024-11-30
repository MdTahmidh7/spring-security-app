import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  mobileNo: string = '';
  password: string = '';
  address: string = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  register(): void {
    const userData = {
      email: this.email,
      username: this.username,
      mobileNo: this.mobileNo,
      password: this.password,
      address: this.address,
    };

    this.authService.register(userData).subscribe({
      next: (data) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Registration failed!'),
    });
  }
}
