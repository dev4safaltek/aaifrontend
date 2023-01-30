import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";
import { CommonErrorMessages } from "../Utilities/common/CommonErrorMessage";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor
        (
            private router: Router,
            private authenticationService: AuthService,
            private _toasterService: ToastrService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.authenticationService.isAuthenticated;
        if (!isLoggedIn || isLoggedIn==null) {
            //this.router.navigateByUrl("/login");
            this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
            this._toasterService.toastrConfig.preventDuplicates = true;
            this._toasterService.error(CommonErrorMessages.SessionExpired, "", {
                timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
              });
        }
        return isLoggedIn;
    }
}
