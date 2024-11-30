import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private apiUrl = 'http://localhost:8080';  // Replace with your backend API URL
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    } else {
      this.currentUserSubject = new BehaviorSubject<any>({});
    }
  }


  getToken(): string | null {
    return localStorage.getItem('token'); // Example of fetching token from localStorage
  }


  // Get current user observable
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, userData)
      .pipe(catchError(this.handleError));
  }

  // Login user and store JWT token
  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(catchError(this.handleError));
  }

  loadUserData() :Observable<any>{
    return this.http
      .get(`${this.apiUrl}/public/users`)
      .pipe(catchError(this.handleError));
  }

  // Logout user by clearing local storage and redirecting
  logout(): void {
    localStorage.removeItem('currentUser');
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

