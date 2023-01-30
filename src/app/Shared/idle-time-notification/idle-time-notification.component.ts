import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
//import {ConfigService} from '../../Platform/Services/config.service';

@Component({
  selector: 'app-idle-time-notification',
  templateUrl: './idle-time-notification.component.html',
  styleUrls: ['./idle-time-notification.component.css']
})
export class IdleTimeNotificationComponent {

  constructor(
    //private ConfigService: ConfigService,
    public dialogRef: MatDialogRef<IdleTimeNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  onCancelClick(): any {
    this.dialogRef.close();
   // this.ConfigService.userNotificationStatus();

  }

}
