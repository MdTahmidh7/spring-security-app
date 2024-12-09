import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {SweetAlertService} from "../sweetaleart/sweet-alert.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetPasswordEditForm: FormGroup;
  username: string = '';
  email: string = '';


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private sweetAlertService: SweetAlertService) {
  }

  ngOnInit() {

    //get value pf query params
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];  // Get 'username' from query params
      this.email = params['email'];        // Get 'email' from query params
      console.log('Username:', this.username);
      console.log('Email:', this.email);
    });


    this.resetPasswordEditForm = this.fb.group({
      username: [this.username,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      email: [this.email,
        [
          Validators.required,
          Validators.email
        ]
      ],
      newPassword: ['',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          this.matchPassword.bind(this)
        ]
      ]
    });
  }


  onSubmit() {

    if (this.resetPasswordEditForm.valid) {

      const username = this.resetPasswordEditForm.get('username')?.value;
      const email = this.resetPasswordEditForm.get('email')?.value;
      const newPassword = this.resetPasswordEditForm.get('newPassword')?.value;
      const confirmPassword = this.resetPasswordEditForm.get('confirmPassword')?.value;

      //call api for reset password
      this.userService.resetPassword(username, email, newPassword).subscribe(
        (response) => {
          console.log('Password reset successfully');
          this.sweetAlertService.showAlert('Success', 'Password reset successfully', 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error resetting password:', error);
          this.sweetAlertService.showAlert('Error', error.error.message, 'error');
        }
      );

      // console.log('Username:', username);
      // console.log('Email:', email);
      // console.log('New Password:', newPassword);
      // console.log('Confirm Password:', confirmPassword);
    }


  }

  // Custom validator to match passwords
  matchPassword(control: any) {

    if (this.resetPasswordEditForm && control.value !== this.resetPasswordEditForm.get('newPassword')?.value) {
      return { mismatch: true };
    }
    return false;
  }
}
