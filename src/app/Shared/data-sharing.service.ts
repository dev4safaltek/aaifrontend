import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  alertdData: any[] =[];
  private messageSource = new BehaviorSubject<string>('service');
    currentMessage = this.messageSource.asObservable();

    private alertMessageSource = new BehaviorSubject<any[]>(this.alertdData);
    alertMessage = this.alertMessageSource.asObservable();

    private  headervalues = new BehaviorSubject<boolean>(false);
    headervalues$ = this.headervalues.asObservable();


    invokeFirstComponentFunction = new EventEmitter();    

    employeeAvailabilityEditFunction = new EventEmitter();  
     subsVar: Subscription | undefined ; 
  constructor() { }
  changeHeader(message: string) {
    this.messageSource.next(message)
  }

   hideShowHeader(mission: boolean) {
    this.headervalues.next(mission);
  }
    onFirstComponentButtonClick(hideMenu :boolean) {    
    this.invokeFirstComponentFunction.emit(hideMenu); 

  }

  messageCountClick(hideMenu :boolean) {    
    this.invokeFirstComponentFunction.emit(hideMenu); 

  }

   changeAlertData(data: any) {
    this.alertMessageSource.next(data);
  }
}
