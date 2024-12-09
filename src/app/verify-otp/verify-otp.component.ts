import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {

  otpEditForm: FormGroup;
  username: string = '';
  email: string = '';

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {

    this.otpEditForm = this.fb.group({
      otp: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ]
      ]
    });
  }


  onSubmit() {

    this.route.queryParams.subscribe(params => {
      this.username = params['username'];  // Get 'username' from query params
      this.email = params['email'];        // Get 'email' from query params
      console.log('Username:', this.username);
      console.log('Email:', this.email);
    });

    if (this.otpEditForm.valid) {

      //call api for verify otp
      this.userService.verifyOtp(this.username, this.email, this.otpEditForm.value.otp).subscribe(
        (response) => {
          console.log('OTP verified successfully');

          let username = response.username;
          let email = response.email;

          let params = { username, email };

          this.router.navigate(['/reset-password'], { queryParams: params });
        },
        (error) => {
          console.error('Error verifying OTP:', error);
        }
      );

      console.log(this.otpEditForm.value);
    }

  }
}
