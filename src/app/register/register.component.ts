import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {SweetAlertService} from "../sweetaleart/sweet-alert.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  passwordType:string = 'password';

  registerForm: FormGroup;


  constructor(private authService: AuthService,
              private router: Router,
              private sweetAlertService: SweetAlertService,
              private fb: FormBuilder) {}


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPassword.bind(this)]],
    });
  }

  // Custom validator to match passwords
  matchPassword(control: any) {
    if (this.registerForm && control.value !== this.registerForm.get('password')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {

    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        this.sweetAlertService.showAlert(
          "Registration successful",
          "You can now login",
          "success"
        );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.sweetAlertService.showAlert(
          "Registration failed",
          err.error.message,
          "error"
        );
      },
    });
  }

  togglePasswordType() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
