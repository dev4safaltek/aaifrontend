import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagePatientFamilyService {

  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }

     //Method for get all patient and family list for manage screen--
     GetPatientFamilyListService(search:any, userId:any, pageNumber:any,pageSize:any):Observable<any> {
      return this.http.get(this.ApiUrl+"PatientFamily/get/getPatientFamilyList?search="+search+"&userId="+userId+"&pageNumber="+pageNumber+"&pageSize="+pageSize+"").pipe(catchError(this.handleError('Get All Agencies list')))
      }

     //Method for change  patient or family status--
      ChangePatientFamilyStatus(dataObj:any): Observable<any>{
        return this.http.post(`${this.ApiUrl}PatientFamily/changePatientFamilyStatus`,dataObj).pipe(
          catchError(this.handleError('Change Patient /Family status Service', []))
        )
    }

      //Method for change  patient or family status--
      BlockUnblockPatientFamily(dataObj:any): Observable<any>{
        return this.http.post(`${this.ApiUrl}PatientFamily/blockUnblockPatientFamily`,dataObj).pipe(
          catchError(this.handleError('Block Unblock Patient /Family  Service', []))
        )
    }

  //this is Add Patient family service method--
   SavePatientFamilyService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}PatientFamily/addPatientFamily`,dataObj).pipe(
      catchError(this.handleError('Add Patient family Service', []))
    )
  }

  //this is Add Patient family service method--
    UpdatePatientFamilyService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}PatientFamily/updatePatientFamily`,dataObj).pipe(
    catchError(this.handleError('Add Patient family Service', []))
    )
      }
  //this is Get Patient family service method--
    GetPatientFamilyData(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}PatientFamily/get/getParticularPatientFamily`,dataObj).pipe(
    catchError(this.handleError('Add Patient family Service', []))
    )
    }
  //Methods for delete caregiver -- 
  DeletedPatientFamily(id:number){
    const Id = id;
    const body = JSON.stringify(Id);
   return this.http.post(`${this.ApiUrl}PatientFamily/deletePatientFamily?Id=`+Id,body).pipe(
     catchError(this.handleError(' delete Patient Family ', []))
   )
 }
 //method for insert Patient skills--
  insertPatientSkillDetails(dataObj:any): Observable<any>{
  return this.http.post(`${this.ApiUrl}PatientFamily/insertPatientSkills`,dataObj).pipe(
  catchError(this.handleError('insert PatientFamily Skill details Service', []))
  )
  }
  //this is Check unique patient Service method--
  CheckUniquePatientService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}PatientFamily/checkUniquePatient`,dataObj).pipe(
      catchError(this.handleError('Check unique patient Service', []))
    )
  }

//Methods for get patient rating service-- 
getpatientRatings(id:number){
  const Id = id;
  const body = JSON.stringify(Id);
 return this.http.post(`${this.ApiUrl}PatientFamily/getPatientRatingList?Id=`+Id,body).pipe(
   catchError(this.handleError('Get patient rating list', []))
 )
}

  //-----------------------------PatientProfileData----------------------------//
    //this is Get Patient family service method--

    GetPatientProfileData(id:any):Observable<any> {
      return this.http.get<any>(this.ApiUrl+"PatientProfile/get/patientdata?id="+id+"").pipe
      (catchError(this.handleError('Get Patient Profile Data')))
      }

  //Methods for get All Dropdown list-- 
   GetPatientDropDownListService():Observable<any> {
    return this.http.get(`${this.ApiUrl}PatientProfile/get/dropdownlist`).pipe(catchError(this.handleError('Get All DropDown')))
    }
 
 //this is Update Caregiver details service method--
   UpdatePatientProfileService(dataObj:any): Observable<any>{
    return this.http.put(`${this.ApiUrl}PatientProfile/updatepatientprofile`,dataObj).pipe(
      catchError(this.handleError('Update Patient details Service', []))
    )
  }

      //this is Update caregiver details service method--
   UploadPatientProfileService(dataObj:any): Observable<any>{
        return this.http.post(`${this.ApiUrl}PatientProfile/upload/patientprofile`,dataObj).pipe(
          catchError(this.handleError('Update Caregiver profile Service', []))
        )
    } 

    //this is Add caregiver Qualification method--
   SaveFamilyDetails(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}PatientProfile/addfamilydetail`,dataObj).pipe(
      catchError(this.handleError('Add Caregiver Qualification Service', []))
     )
   }

   GetPatientFamilyDetails(id:any):Observable<any> {
    return this.http.get<any>(this.ApiUrl+"PatientProfile/getfamilydetails?id="+id+"").pipe
    (catchError(this.handleError('Get Patient Profile Data')))
    }

         //method for insert caregiver skills--
   insertPatientPreferredSkillDetails(dataObj:any): Observable<any>{
     return this.http.post(`${this.ApiUrl}PatientProfile/insertpatientSkills`,dataObj).pipe(
     catchError(this.handleError('insert Caregiver Skill details Service', []))
    )}

          //Methods for delete agency -- 
     DeleteFamilyMember(id:number){
      const Id = id;
      const body = JSON.stringify(Id);
      return this.http.delete(`${this.ApiUrl}PatientProfile/delete/familymember?Id=`+Id).pipe(
      catchError(this.handleError(' delete user ', [])) ) }


     //this is error handler method--
     private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        return of(result as T);
      };
    }
}
