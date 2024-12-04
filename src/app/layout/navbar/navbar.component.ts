import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {SweetAlertService} from "../../sweetaleart/sweet-alert.service";
import {NgOptimizedImage} from "@angular/common";
// import {TokenService} from "../tokenService/TokenService";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  token: string | null = null;
  username: string | '' = '';
  isLoggedOut: boolean = false;


  constructor(private router: Router,
              private authService: AuthService,
              private sweetAlertService: SweetAlertService) {

  }

  ngOnInit() {
    this.getUsername()
  }


  logout() {
    this.authService.logout();
    this.isLoggedOut = true;
    this.router.navigate(['/login']);
  }

  showAlert() {
    this.sweetAlertService.showConfirmationDialog(
      "Are you sure?",
      "You will be logged out!",
      "Logout")
      .then((result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
  }

  getUsername() {
    this.username = this.authService.getUserName();
  }


}
