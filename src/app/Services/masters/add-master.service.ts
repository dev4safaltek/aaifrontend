import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddMasterService {

  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }

       //this is Add New Skill service method--
       AddNewSkillsService(dataObj:any): Observable<any>{
        return this.http.post(`${this.ApiUrl}Masters/addNewSkills`,dataObj).pipe(
          catchError(this.handleError('Add new skill Service', []))
        )
      }
       //this is Add New department service method--
      AddNewDepartmentService(dataObj:any): Observable<any>{
        return this.http.post(`${this.ApiUrl}Masters/addNewDepartment`,dataObj).pipe(
         catchError(this.handleError('Add new Department Service', []))
         )
         }
    //this is Add New Employee service method--
      AddNewEmployeeService(dataObj:any): Observable<any>{
        return this.http.post(`${this.ApiUrl}Masters/addNewEmployee`,dataObj).pipe(
         catchError(this.handleError('Add new Employee Service', []))
         )
      }
     //this is Add New Qualification service method--
     AddNewQualificationService(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}Masters/addNewQualification`,dataObj).pipe(
       catchError(this.handleError('Add new qualificaton Service', []))
       )
      }

        //this is Add New Diagnosis service method--
     AddNewDiagnosisService(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}Masters/addNewDiagnosis`,dataObj).pipe(
       catchError(this.handleError('Add new Diagnosis Service', []))
       )
      }
     //this is Change master status service method--
     ChangeMasterStatus(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}Masters/changeMasterStatus`,dataObj).pipe(
       catchError(this.handleError('Add new Diagnosis Service', []))
       )
      }

    //this is delete  master data service method--
      DeleteMasterData(type:any ,id:number){
        const Id = id;
        const body = JSON.stringify(Id);
       return this.http.post(`${this.ApiUrl}Masters/deleteMaster?Id=`+Id+"&MasterType="+type,body).pipe(
         catchError(this.handleError(' delete master data ', []))
       )
     }
    //method is used for update master type--
    UpdateMasterDataService(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}Masters/updateMasterDataService`,dataObj).pipe(
       catchError(this.handleError('Update Master Data Service', []))
       )
      }

    //this is Add New office service method--
    AddNewOfficeService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}Masters/addNewOffice`,dataObj).pipe(
    catchError(this.handleError('Add new office Service', []))
          )
    }
         //this is error handler method--
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
}
}
