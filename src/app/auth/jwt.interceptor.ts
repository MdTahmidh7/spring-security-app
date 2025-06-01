import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {throwError} from "rxjs";
import {inject} from "@angular/core";

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = localStorage.getItem('jwt_token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  console.log("___",req)
  // Handle the response and catch 401 errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      console.log("Error status = ",error.status)

      if (error.status === 401) {
        // Clear the expired/invalid token
        localStorage.removeItem('jwt_token');

        // Redirect to login page
        router.navigate(['/login']);

        // Optionally, show a toast message
        console.error('Session expired. Please log in again.');
      }
      return throwError(() => error);
    })
  );
};



