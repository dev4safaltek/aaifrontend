import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageServiceService {

  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(private http: HttpClient) { }

   
   //this is Update agency details service method--
   UploadProfileService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}Agency/uploadAgencyProfile`,dataObj).pipe(
      catchError(this.handleError('Update Agency details Service', []))
    )
  } 

    //this is Update caregiver details service method--
    UploadCaregiverProfileService(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}Caregiver/uploadCaregiverProfile`,dataObj).pipe(
        catchError(this.handleError('Update Caregiver profile Service', []))
      )
    } 

        //this is Update caregiver details service method--
        UploadCaregiverDocumentService(dataObj:any): Observable<any>{
          return this.http.post(`${this.ApiUrl}Caregiver/uploadCaregiverDocuments`,dataObj).pipe(
            catchError(this.handleError('Update Caregiver  documents  Service', []))
          )
        } 

   //this is Update agency details service method--
    UploadAdminProfileService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}UserProfile/upload/adminprofile`,dataObj).pipe(
      catchError(this.handleError('Upload Admin Profile', []))
    )
  } 

    //method used for Add Patient family profile--
    UploadPatientFamilyProfileService(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}PatientFamily/uploadPatientFamilyProfile`,dataObj).pipe(
        catchError(this.handleError('Update Patient family profile Service', []))
      )
    } 

   //Method is used for upload staff profile service--
   UploadStaffProfileService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}Agency/uploadAgencyProfile`,dataObj).pipe(
      catchError(this.handleError('Update Agency details Service', []))
    )
  } 

     //this is Update agency details service method--
     UploadAdminUserProfileService(dataObj:any): Observable<any>{
      return this.http.post(`${this.ApiUrl}UserProfile/upload/adminprofile`,dataObj).pipe(
        catchError(this.handleError('Upload Admin Profile', []))
      )
    } 
        //this is Update caregiver Credential service method--
        UploadCaregiverCredentialService(dataObj:any): Observable<any>{
          return this.http.post(`${this.ApiUrl}Caregiver/uploadCaregiverCredential`,dataObj).pipe(
            catchError(this.handleError('Upload caregiver documents credential service', []))
          )
        } 

     //this is error handler method--
     private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        return of(result as T);
      };
  }
}
