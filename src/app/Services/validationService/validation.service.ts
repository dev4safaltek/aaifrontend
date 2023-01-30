import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }

      //method is used for check unique validation--
      checkUniqueValidationService(dataObj:any): Observable<any>{
        return this.http.post(`${this.ApiUrl}Masters/checkUniqueEmailValidation`,dataObj).pipe(
          catchError(this.handleError('check unique email', []))
        )
      }

    //method is used for check unique validation--
    checkUniqueUserNameService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}Masters/checkUniqueUserNameValidation`,dataObj).pipe(
    catchError(this.handleError('check unique username', []))
      )
    }
      
      //this is error handler method--
      private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        return of(result as T);
       };
        }
}
