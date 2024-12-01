import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from "./auth/auth.service";
import Swal from "sweetalert2";
import {SweetAlertService} from "./sweetaleart/sweet-alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'jwt-auth-app';
  token: string | null = null;

  constructor(private router: Router,
              private authService: AuthService,
              private sweetAlertService: SweetAlertService) {
  }

  ngOnInit() {

    this.token = this.authService.getToken();

    if (this.token) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

  }

  logout() {
      this.authService.logout();
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

}
