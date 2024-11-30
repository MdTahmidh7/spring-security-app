import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jwt-auth-app';
}
