import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }


   //this is Add user service method--
   SaveUserService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}UserProfile/save/user`,dataObj).pipe(
      catchError(this.handleError('Add User Service', []))
    )
  }
  
  //this is Update user service method--
  UpdateUserService(dataObj:any): Observable<any>{
    return this.http.put(`${this.ApiUrl}UserProfile/update/user`,dataObj).pipe(
      catchError(this.handleError('Update User Service', []))
    )
  }

  //Methods for get country list-- 
    GetCountryListService():Observable<any> {
      return this.http.get(`${this.ApiUrl}UserProfile/get/countrylist`).pipe(catchError(this.handleError('Get All Country')))
      }
  
  //Method for get all state list--
     GetStateListService():Observable<any> {
      return this.http.get(`${this.ApiUrl}UserProfile/get/statelist`).pipe(catchError(this.handleError('Get All State')))
      }


    GetUserListService(search:any,pageNumber:any,pageSize:any):Observable<any> {
      return this.http.get<any>(this.ApiUrl+"UserProfile/get/userList?search="+search+"&pageNumber="+pageNumber+"&pageSize="+pageSize+"").pipe(catchError(this.handleError('Get All Users list')))
      }

   //Methods for get particular user data-- 
    GetUserData(id:number,type:any){
     return this.http.get<any>(this.ApiUrl+"UserProfile/getUserData?Id="+id+"&Type="+type+"").pipe(
     catchError(this.handleError('Get Particular User Data', []))
     )
    }

      //Methods for delete agency -- 
     DeleteUser(id:number){
     const Id = id;
     const body = JSON.stringify(Id);
     return this.http.delete(`${this.ApiUrl}UserProfile/delete/user?Id=`+Id).pipe(
      catchError(this.handleError(' delete user ', []))
      )
     }

      //Methods for User active and deactive details-- 
    ActiveDeactiveUser(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}UserProfile/activedeactiveuser`,dataObj).pipe(
        catchError(this.handleError('Active Deactive details Service', []))
      )
    }

     //Methods for User block and unblock details-- 
     BlockUnBlockUser(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}UserProfile/blockunblockuser`,dataObj).pipe(
        catchError(this.handleError('Block UnBlock details Service', []))
      )
    }

        //this is Add user service method--
   SaveAdminUserService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}UserProfile/save/user/admin`,dataObj).pipe(
      catchError(this.handleError('Add User Service', []))
    )
  }

   //this is error handler method--
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
}
}
