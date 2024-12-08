import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {SweetAlertService} from "../sweetaleart/sweet-alert.service";
import {CustomUserDTO} from "../model/CustomUserDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  resetPasswordEditForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private sweetAlertService: SweetAlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.resetPasswordEditForm = this.fb.group({
      username: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
    });
  }


  onSubmit() {

    const username = this.resetPasswordEditForm.get('username')?.value;
    const email = this.resetPasswordEditForm.get('email')?.value;

    this.userService.verifyUser(username, email).subscribe(
      (next:CustomUserDTO) => {

        const username = next.username;
        const email = next.email;

        console.log(next)
        console.log(username + email);

        //send username and email in request params
        const params = { username, email };
        this.router.navigate(['/reset-password'], { queryParams: params });
      },
      error => {
        console.error(error);
        // Handle the error if the request fails
        this.sweetAlertService.showAlert('Error', error.error.message, 'error');
      }
    );

    console.log('Username:', username);
    console.log('Email:', email);

  }

}
