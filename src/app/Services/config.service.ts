import { Injectable } from "@angular/core";
import { LocalStorageService } from "../../core/storage/localstorage.service";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { IdleTimeNotificationComponent } from "../../Shared/idle-time-notification/idle-time-notification.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class ConfigService {
 
    constructor(
        private auth: AuthService,
        private router: Router,
        private readonly localStorage: LocalStorageService,
        private dialog: MatDialog
        ) { }

    private interval: any;
    private timeoutTracker: any;
    private isUserNotified: boolean = false;

    public MonitorIdleTime(data: any) {
        this.tracker(data);
        this.startInterval()
    }

    private startInterval() {        
        this.interval = setInterval(() => {   
            var warningTime =  new Date(this.localStorage.get("_idleWarningTime", new Date()));
            var logoutTime =  new Date(this.localStorage.get("_idleLogoutTime", new Date()));         
            if (warningTime < new Date()) {
                if(!this.isUserNotified)
                {
                    this.dialog.open(IdleTimeNotificationComponent, {
                        width: "400px",
                        data: { title: "Session Timeout", message: "Your session will expire soon" },
                      });
                      this.isUserNotified = true;
                }
            }
            if(logoutTime < new Date())
            {
                this.isUserNotified = false;
                this.dialog.closeAll();
                this.auth.logout();
                this.cleanUp();
                this.router.navigate(["login"]);
            }
        }, 5000);
    }

    public userNotificationStatus()
    {
       this.isUserNotified = false;
    }

    private updateWarningAndLogoutTime(data: any) {
        if (this.timeoutTracker) {
            clearTimeout(this.timeoutTracker);
          }
          this.timeoutTracker = setTimeout(() => {
            var browserTime = new Date().getTime();
            this.localStorage.put("_idleWarningTime", browserTime + (data.idleWarningTime * 1000));
            this.localStorage.put("_idleLogoutTime", browserTime + (data.idleWarningTime * 1000) +(data.idleLogoutTime * 1000));     
          }, 500);
       }

    private tracker(data: any) {
        window.addEventListener('mousemove', (event) => {
            this.updateWarningAndLogoutTime(data);
            // event.preventDefault();
          });
          window.addEventListener('scroll', (event) => {
            this.updateWarningAndLogoutTime(data);
            // event.preventDefault();
          });
          window.addEventListener('keydown', (event) => {
            this.updateWarningAndLogoutTime(data);
            // event.preventDefault();
          });
    }

   private cleanUp() {
        clearInterval(this.interval);
        // window.removeEventListener("mousemove");
        // window.removeEventListener("scroll", new Date());
        // window.removeEventListener("keydown", null);
        this.localStorage.delete("_idleWarningTime");
        this.localStorage.delete("_idleLogoutTime");
      }

}
