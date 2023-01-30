import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataEditor {

    private dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private groupMessagedataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private chatdataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private notificationdataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private PushNotificationSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private videoParticipantDataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private updateAppointmentStatusDataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public newMessageData: Observable<any> = this.dataSource.asObservable();
    public newGroupMessageData: Observable<any> = this.groupMessagedataSource.asObservable();
    public newChatData: Observable<any> = this.chatdataSource.asObservable();
    public notificationData: Observable<any> = this.notificationdataSource.asObservable();
    public PushnotificationData: Observable<any> = this.PushNotificationSource.asObservable();
    public videoParticipantNotificationData: Observable<any> = this.videoParticipantDataSource.asObservable();
    public updateAppointmentStatusData: Observable<any> = this.updateAppointmentStatusDataSource.asObservable();

    constructor() { }

    public sendMessageData(newData: any): void {
        if (newData)
            this.dataSource.next(newData);
    }

    public sendGroupMessageData(newData: any): void {
        if (newData)
            this.groupMessagedataSource.next(newData);
    }

    public sendVideoParticipantData(newData: any): void {
        if (newData)
            this.videoParticipantDataSource.next(newData);
    }

    public sendUpdateAppointmentStatusData(newData: any): void {
        if (newData)
            this.updateAppointmentStatusDataSource.next(newData);
    }

    public getMessageData(newData: any): void {
        if (newData)
            this.chatdataSource.next(newData);
    }

    public getNotificationData(newData: any): void {
        if (newData)
            this.notificationdataSource.next(newData);
    }

    public sendNotificationData(newData: any): void {
        if (newData)
            this.PushNotificationSource.next(newData);
    }
}
