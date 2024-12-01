import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {UserDTO} from "../model/UserDTO";
import {TokenService} from "../tokenService/TokenService";

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private apiUrl = 'http://localhost:8080';  // Replace with your backend API URL
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {

    if (typeof window !== 'undefined' && window.localStorage) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    } else {
      this.currentUserSubject = new BehaviorSubject<any>({});
    }

  }


  /*getToken(): string | null {
    return localStorage.getItem('jwt_token'); // Example of fetching token from localStorage
  }*/

  getToken(): string | null {
    return this.tokenService.getToken();
  }


  // Delete JWT token from local storage
  clearTokenFromLocalStorage(): void {
    localStorage.removeItem('jwt_token');
    this.currentUserSubject.next(null);
  }


  // Get current user observable
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Register a new user
  register(userData: UserDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/public/register`, userData)
      .pipe(catchError(this.handleError));
  }

  // Login user and store JWT token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/public/login`,
      { username, password },
      {headers: { 'Content-Type': 'application/json' }}
    );
  }

  loadUserData():Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    });

    return this.http.get<any>(
      `http://localhost:8080/users`,{headers});
  }

  // Logout user by clearing local storage and redirecting
  logout(): void {
    localStorage.removeItem('jwt_token');
    this.tokenService.setToken(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Get headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Handle API errors
  private handleError(error: any): Observable<never> {
    console.error(error);
    throw error;
  }
}

