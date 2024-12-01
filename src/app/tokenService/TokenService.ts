import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();  // Observable to subscribe to token changes

  constructor() { }

  setToken(token: string | null): void {
    this.tokenSubject.next(token);  // Update the token
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();  // Get the current value of the token
  }
}
