import {Component, inject, TemplateRef} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {CommonModule, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {UserDTO} from "../model/UserDTO";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbInputDatepicker, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    NgbModalModule,
    FormsModule,
    NgbInputDatepicker,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  allUsers:UserDTO[] = [];
  editForm: FormGroup;
  selectedUser: any = null;


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {

    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.loadUsers();
  }


  loadUsers() {

    console.log("Token from local storage",JSON.stringify(this.authService.getToken()));

    this.authService.loadUserData()
    .subscribe({
      next:(data)=>{
        this.allUsers = data;
        console.log("Data"+ data)
      },
      error: (err) => {
        this.router.navigate(['/login']);
        console.log(err);
      },
    })
  }

  // Open the modal and populate the form
  editUser(user: any) {

    this.selectedUser = user;
    this.editForm.setValue({
      email: user.email,
      username: user.username
    });
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal?.showModal();
  }

  // Save the user data from the form
  saveUser() {
    if (this.editForm.valid) {
      console.log('Updated User:', this.editForm.value);
      this.closeModal();
    }
  }

  // Close the modal
  closeModal() {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal?.close();
  }












}
