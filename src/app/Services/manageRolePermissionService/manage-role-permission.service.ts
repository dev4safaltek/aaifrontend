import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageRolePermissionService {

  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }
   //Method for get all agency list for manage screen--
   GetUserRolesService():Observable<any> {
    return this.http.get(`${this.ApiUrl}RolePermission/get/user/roles`).pipe(catchError(this.handleError('Get All User Roles')))
    }

     //Method for get all agency list for manage screen--
   GetUserModulesService(roleId:any, userId:Number):Observable<any> {
    return this.http.get<any>(this.ApiUrl+"RolePermission/get/role/modules?roleId="+roleId+"&userId="+userId+"").pipe(
      catchError(this.handleError('Get All User Modules', [])))
    }

    addPermissionButton(model:any): Observable<any>  {
      return this.http.post<any>(this.ApiUrl+"RolePermission/user/add/permission", model);
    }

    //Service is used for get user permission for users
    GetUserPermissionsService(userType:any, userId:Number):Observable<any> {
      return this.http.get<any>(this.ApiUrl+"RolePermission/get/role/userpermission?userType="+userType+"&userId="+userId+"").pipe(
        catchError(this.handleError('Get logged in user permission', [])))
      }


     //this is error handler method--
     private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        return of(result as T);
      };
    }
}
