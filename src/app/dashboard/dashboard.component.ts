import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {NgForOf} from "@angular/common";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {UserDTO} from "../model/UserDTO";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  allUsers:UserDTO[] = [];

  constructor(private authService: AuthService,
              private router: Router) {}

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

}
