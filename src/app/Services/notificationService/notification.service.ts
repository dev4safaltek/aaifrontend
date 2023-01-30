import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as signalR from "@microsoft/signalr"
import {DataEditor} from '../data-editor.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public data: any[];
  public broadCastData: any[];
  private hubConnection: signalR.HubConnection
  ApiUrl = environment.ICC_API ; //Access localhost API path from environment.ts file;
  constructor(
    private http: HttpClient,
    private dataEditor : DataEditor,
    ) 
  { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(environment.baseSignalrMessage, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets}).build();

    this.hubConnection.start()
      .catch(err => console.log('Error while starting connection: ' + err))
  }


  public addNewMessageReceivedListener = () => {
    this.hubConnection.on('NewMessageReceived', (message) => {
      console.log(message);
      this.dataEditor.sendMessageData(message);
    });
  }

    //this is Add user service method--
   SaveAdminUserService(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}UserProfile/save/user/admin`,dataObj).pipe(
      catchError(this.handleError('Add User Service', []))
    )
  }
   GetCaregivers(type:any){
    return this.http.get<any>(this.ApiUrl+"Message/getUsers?Type="+type+"").pipe(
    catchError(this.handleError('Get Particular User Data', []))
    )
   }

   GetAgency(type:any){
    return this.http.get<any>(this.ApiUrl+"Message/getUsers?Type="+type+"").pipe(
    catchError(this.handleError('Get Particular User Data', []))
    )
   }

   GetClients(type:any){
    return this.http.get<any>(this.ApiUrl+"Message/getUsers?Type="+type+"").pipe(
    catchError(this.handleError('Get Particular User Data', []))
    )
   }

   getThreadMessages(thread:any){
    return this.http.get<any>(this.ApiUrl+"Message/getThreadMessages?thread="+thread+"").pipe(
    catchError(this.handleError('Get Particular User Data', []))
    )
   }

   getAllLatestMessages(userId:any){
    return this.http.get<any>(this.ApiUrl+"Message/get-all-latest-messages?userId="+userId+"").pipe(
    catchError(this.handleError('Get Particular User Data', []))
    )
   }

  //this is used to Send Message to user--
   sendMessage(dataObj:any): Observable<any>{
    return this.http.post(`${this.ApiUrl}Message/send-message-fileupload`,dataObj).pipe(
      catchError(this.handleError('Send Message', []))
    )
  } 

  // public sendMessage(dataObj:any): Observable<any> {
  //   var url = `${this.ApiUrl}/message/send-message-fileupload`;
  //   return this.http.post(url, formData);
  // }

   //this is error handler method--
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
}
}
