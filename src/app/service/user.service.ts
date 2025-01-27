import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:8080';  // Replace with your backend API URL

  constructor(private http: HttpClient,
              private router: Router) {
  }



  verifyUser(username: string, email: string): Observable<any> {

    //sent username and email in request params
    const params = { username, email };

    return this.http.get<any>(
      `${this.apiUrl}/public/verify-user`,
      {params}
    );

  }

  verifyOtp(username: string, email: string, otp: string): Observable<any> {

    //sent username and email in request params
    const params = { username, email, otp };

    return this.http.get<any>(
      `${this.apiUrl}/public/verify-otp`,
      {params}
    );

  }

  resetPassword(username: string, email: string, newPassword: string): Observable<any> {

    //sent username and email in request params
    const params = { username, email, newPassword };

    return this.http.post<any>(
      `${this.apiUrl}/public/reset-password`,
      {},
      {params}
    );
  }



}
