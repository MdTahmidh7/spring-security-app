import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LayoutComponent} from "./layout/layout.component";
import {RegisterComponent} from "./register/register.component";



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'register', component: RegisterComponent }, // Registration route
  {
    path: '',
    component: LayoutComponent, // Parent layout for routes with navbar
    children: [
      { path: 'dashboard', component: DashboardComponent }, // Dashboard route
      // Add other routes here
    ],
  },
  { path: '**', redirectTo: 'login' }, // Wildcard route for 404
];
