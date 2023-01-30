import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }

  //this is sign -up service method--
  SignUpService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}UserProfile/register`,dataObj).pipe(
      catchError(this.handleError('Sign Up', []))
    )
  }
    //Method for get all categorys for sign-up--
   GetAllCategoryService():Observable<any> {
    return this.http.get(`${this.ApiUrl}UserProfile/get/usertype`).pipe(catchError(this.handleError('Get All Categorys')))
    }
    //Methods for activate user account after newly signup
    ActivateUserAccountService(userIds:any){
       const userId = parseInt(userIds)
       const body = JSON.stringify(userIds);
      return this.http.post(`${this.ApiUrl}Authenticate/activate/account?userId=`+userId,body).pipe(
        catchError(this.handleError('Activate User Account', []))
      )
    }
  //this is error handler method--
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    return of(result as T);
  };

 

}
}
