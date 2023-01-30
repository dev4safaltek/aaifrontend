import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { CommonErrorMessages } from "../../Utilities/common/CommonErrorMessage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toastrService: ToastrService) {
  }

   deleteAllCookies():void {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name;
    }
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.userDetail.accessToken;
    const authReq = req.clone({ headers: req.headers.set("Authorization", "Bearer " + authToken) });

    return next.handle(authReq)
      .pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              if (this.authService.isAuthenticated || this.authService.isAuthenticated === undefined) {
                this.toastrService.error(CommonErrorMessages.SessionExpired, "", {
                  timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
                });
                //this.authService.isAuthenticated = false;
                this.deleteAllCookies();
                this.authService.logout();
              }
            }
          }
          return throwError(err);
        }));
  }
}
