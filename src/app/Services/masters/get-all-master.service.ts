import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetAllMasterService {

  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }
      //Method for get Country--
  GetCountryMaster():Observable<any> {
   return this.http.get(`${this.ApiUrl}Masters/get/getCountryMaster`).pipe(catchError(this.handleError('Get All Country')))
  }
     //Method for get States--
     GetStateMaster():Observable<any> {
      return this.http.get(`${this.ApiUrl}Masters/get/getStateMaster`).pipe(catchError(this.handleError('Get All Country')))
     }
  //Method for get Get Department Type Master--
   GetDepartmentTypeMaster():Observable<any> {
    return this.http.get(`${this.ApiUrl}Masters/get/getDepartmentTypeMaster`).pipe(catchError(this.handleError('Get All Country')))
    }
  //Method for Get EmployeeType Master States--
   GetEmployeeTypeMaster():Observable<any> {
    return this.http.get(`${this.ApiUrl}Masters/get/getEmployeeTypeMaster`).pipe(catchError(this.handleError('Get All Country')))
    }

  //Method for Get EmployeeType Master States--
   GetGenderTypeMaster():Observable<any> {
    return this.http.get(`${this.ApiUrl}Masters/get/getGenderTypeMaster`).pipe(catchError(this.handleError('Get All Country')))
    }
     //Method for  get Qualification Master--
     GetQualificationMaster():Observable<any> {
    return this.http.get(`${this.ApiUrl}Masters/get/getQualificationMaster`).pipe(catchError(this.handleError('Get All Country')))
    }

      //Method for   get Skills Master--
    getSkillsMaster():Observable<any> {
     return this.http.get(`${this.ApiUrl}Masters/get/getSkillsMaster`).pipe(catchError(this.handleError('Get All Country')))
      }
    //Method for  get Organization Master--
    getOrganizationMaster():Observable<any> {
      return this.http.get(`${this.ApiUrl}Masters/get/getOrganizationMaster`).pipe(catchError(this.handleError('Get All Country')))
    }

    //Method for get Diagnosis Master--
    getDiagnosisMaster():Observable<any> {
        return this.http.get(`${this.ApiUrl}Masters/get/getDiagnosisMaster`).pipe(catchError(this.handleError('Get All Country')))
        }

    //Method for  get plan type Master--
    getPlanTypeMaster():Observable<any> {
      return this.http.get(`${this.ApiUrl}Masters/get/getPlanTypeMaster`).pipe(catchError(this.handleError('Get All Country')))
      }
   //Method for get all Master's--
    getAllMastersList():Observable<any> {
        return this.http.get(`${this.ApiUrl}Masters/get/getAllMasterslist`).pipe(catchError(this.handleError('Get All Country')))
        }   
        
        
     //Method for get all Master's--
     getOfficeMastersList():Observable<any> {
      return this.http.get(`${this.ApiUrl}Masters/get/getOfficeMasterslist`).pipe(catchError(this.handleError('Get All Country')))
      }        
  //this is error handler method--
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
