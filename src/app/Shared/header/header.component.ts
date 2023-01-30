import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { DataEditor } from 'src/app/Platform/Services/data-editor.service';
//import { ManageNotificationService } from 'src/app/Platform/Services/manageNotificationService/manage-notification.service';
import { environment } from 'src/environments/environment';
import { AuthService } from "../../auth/auth.service";
import { DefaultNumber } from '../Enums/Default.enums';
//import { NotificationDetailComponent } from "../../Shared/view-all-notification/notification-detail/notification-detail.component";
//import { DialogModel } from 'src/app/Platform/Model/DialogModel';
import { MatDialog } from '@angular/material/dialog';
//import { ManageRolePermissionService } from 'src/app/Platform/Services/manageRolePermissionService/manage-role-permission.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from 'src/app/core/storage/localstorage.service';
//import { ConfigService } from 'src/app/Platform/Services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   newForm!: FormGroup;
   useremail : any;
   fullName : any;
   userId : any;
   profile: any;
   imageSrc?: any;
   notificationCount:any = 0;
   userType :any;
   isSubscribed:any;
   disabledControl:any;
   Notificationdata:any =[];
   pagesize = environment.defaultPageSize;
   search = '';
   status=3;
   pageIndex: number = DefaultNumber.Zero;
   @ViewChild('navbar') sidebarlist: ElementRef;
   MenuList:any =[];
   public permissionList :any = [];
   AgencyStaff:boolean = false;
   CaregiverAgency:boolean=false;
   type:any
   private onDestroy$: Subject<void> = new Subject<void>();
  constructor(public authService: AuthService,
     //private _notificationService : ManageNotificationService,
     private route: ActivatedRoute,
     private router: Router, 
     //private dataEditor : DataEditor,
     //private _roleService: ManageRolePermissionService,
     private fb: FormBuilder,    
     private readonly localStorage: LocalStorageService,
     //private readonly ConfigService : ConfigService,
     public dialog: MatDialog) 
     {
      //  dataEditor.PushnotificationData.subscribe((res: { data: any; } | null) => {
      //   if(res == null){
      //     this.GetNotifications();
      //   }
      //   else{        
      //       this.GetNotifications();
      //     }      
      // });
    }

  ngOnInit(): void {
    this.fullName = this.authService.userName;
    this.useremail  = this.authService.email;
    this.userId = this.authService.userID;
    this.profile = this.authService.profilePicture;
    this.imageSrc = this.profile;
    this.userType = this.authService.userType;
    this.isSubscribed = this.authService.isSubscribed;
    if(this.isSubscribed==true){
      this.disabledControl = 1;
    }
    else{
      this.disabledControl = 0;
    }
    //this._notificationService.startConnection();
    //this._notificationService.addNotificationRecievedListener(); 
    this.CreateFormGroup();
    //this.getUserRolesAndPermissions();
  }

  CreateFormGroup(): void {
    this.newForm = this.fb.group({
      Search: new FormControl("")
    })
  }

GetNotifications():any{
this.userId =this.authService.userID;
this.useremail=this.authService.email;
this.userType =this.authService.userType;
this.pagesize = environment.defaultPageSize
this.pageIndex = DefaultNumber.Zero;
this.search='';
this.status=3;
// this._notificationService.GetUserNotificationList(this.userId,this.status,this.search,this.pageIndex,this.pagesize).subscribe((response:any)=>{
//   if(response.data.length>0){
//    this.notificationCount =   response.data[0].UnReadNotification;
//    this.Notificationdata = response.data;
//   }
//   else{
//     this.notificationCount =  0;
//     this.Notificationdata = [];
//   }
//  })
}

getUserRolesAndPermissions(){
  // this._roleService.GetUserPermissionsService(this.userType, this.userId).subscribe((response:any)=>{
  // if(response.data[0].IsAgency != 1 ){
  //   console.log(response.data)
  //   this.permissionList = response.data;
  //   this.AgencyStaff = true;
  //   this.CaregiverAgency = false;
  // }
  // else {
  //   this.AgencyStaff = false;
  //   this.CaregiverAgency = true;
  // }
  // })
}

preventEvent(e:any){
  e.stopPropagation();
  if (e.clickEvent && e.clickEvent.target.className!="nav-link") {
    e.preventDefault();
  }
}

logout(): void {
  localStorage.clear();
  this.router.navigate(["/login"]);
}

OpenNotificationDetail(Id:any,NotificationId:any):any{
  // const model: DialogModel = {
  //   Id: Id,
  //   HeaderText: "",
  //   Type:NotificationId,
  // };
  // const dialogRef = this.dialog.open(NotificationDetailComponent, {
  //   data: model,
  //   width: "50vw",
  //   maxWidth: "50vw",
  //   maxHeight: "50vh",
  //   height: "50vh"
  // });
  // //this.dialogCtrl.nativeElement.focus();
  // dialogRef.afterClosed().subscribe(result => { });

}

 ClearAllNotifications():any{
  this.userId =this.authService.userID; 
  // this._notificationService.ClearAllNotification(this.userId).subscribe((response:any)=>{
  //   if(response.data!=null){
  //     this.notificationCount =  0;
  //     this.Notificationdata = [];
  //   }
  //  })   
 }

 GetMenuList(event:any):any{
  this.MenuList =[];
  let filter = this.newForm.controls['Search'].value
  let i =0;
  let a;
  let nativeElement= <HTMLInputElement>document.getElementById("navbar"); 
  let li = nativeElement.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    let data = a.innerHTML.replace(/<[^>]*>/g, '').trim();
    let search = data.toUpperCase();
    if (data.toUpperCase() == filter.toUpperCase()) {
      this.MenuList.push(data);
    }
  }
 }

 MenuValue(menu:any):any{
  let filter = menu;
  let i =0;
  let a;
  let nativeElement= <HTMLInputElement>document.getElementById("navbar"); 
  let li = nativeElement.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    let data = a.innerHTML.replace(/<[^>]*>/g, '').trim();   
    if (data.toUpperCase() == filter.toUpperCase()) {
      let href = a.getAttribute('href');
      let evlength = href?.toString().length;
      let path =href?.toString().slice(1,evlength);
      this.router.navigate([""+path+""]);
    }
  }

 }

  // Called after ngOninit
   ngAfterViewInit() {
    this.monitorIdleTime();
  }

 private putconfigData(data :any) {
  var browserTime = new Date().getTime();
  this.localStorage.put(
    "_idleWarningTime",
    browserTime + data.idleWarningTime * 1000
  );
  this.localStorage.put(
    "_idleLogoutTime",
    browserTime + data.idleWarningTime * 1000 + data.idleLogoutTime * 1000
  );
 // this.ConfigService.MonitorIdleTime(data);
}

 private async monitorIdleTime() {
  this.authService
    .GetConfiguration()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(
      (data:any) => {
        this.putconfigData(data);
      },
      (error:any) => {
        this.putconfigData({ idleWarningTime: 50, idleLogoutTime: 40 });
        // Log
      }
    );
}

}
