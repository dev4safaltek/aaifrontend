import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }
//Login service method--

loginService(loginDetails :any) : Observable<any>{
  return this.http.post(`${this.ApiUrl}Authenticate/login`, loginDetails).pipe(
    catchError(this.handleError('Log In', []))
  )                    
}
//Forgot Password service mehod--
forgotPasswordService(dataObj:any):Observable<any>{
  return this.http.post(`${this.ApiUrl}UserProfile/forgot`,dataObj).pipe(
    catchError(this.handleError('Forgot Password',[]))
  )
}
//this is error handler method--
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    return of(result as T);
  };
}
}
