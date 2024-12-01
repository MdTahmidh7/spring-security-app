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

  id: number = 0;
  username: string = '';
  password: string = '';
  passwordType:string = 'password';


  constructor(private authService: AuthService,
              private router: Router) {}

  register(): void {
    const userData = {
      id: this.id,
      username: this.username,
      password: this.password,
    };

    this.authService.register(userData).subscribe({
      next: (data) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Registration failed!'),
    });
  }

  togglePasswordType() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
