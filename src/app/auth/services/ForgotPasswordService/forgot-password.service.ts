import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }

      //Methods for user Forgot password-- 
      ForgotPassword(email:any){
        const emailId = email;
        const body = JSON.stringify(email);
       return this.http.post(`${this.ApiUrl}UserProfile/forgot/password?email=`+emailId,body).pipe(
         catchError(this.handleError('Forgot password', []))
       )
     }
      //Methods for user Reset password-- 
      ResetPassword(params:any){
        return this.http.post(`${this.ApiUrl}UserProfile/create/new/password`,params ).pipe(
        catchError(this.handleError('Reset password', []))
        )}
     
    //this is error handler method--
    private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
}
}
