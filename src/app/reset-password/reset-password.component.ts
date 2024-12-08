import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

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
  isUsernameDisabled: boolean = true;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute) {
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

    /*const username = this.resetPasswordEditForm.get('username')?.value;
    const email = this.resetPasswordEditForm.get('email')?.value;

    console.log('Username:', username);
    console.log('Email:', email);*/

  }

  // Custom validator to match passwords
  matchPassword(control: any) {
    if (this.resetPasswordEditForm && control.value !== this.resetPasswordEditForm.get('newPassword')?.value) {
      return { mismatch: true };
    }
    return null;
  }
}
