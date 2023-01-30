import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { LocalStorageService } from "../core/storage/localstorage.service";
import { UserToken } from "./user-token.model";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly AUTHENTICATION_KEY = environment.AUTHENTICATION_KEY;
  private _authorizedAccess: boolean;
  constructor(
    private router: Router,
    private readonly http: HttpClient,
    private readonly localStorage: LocalStorageService,
  ) {

  }

  get userDetail(): UserToken {
    const user = this.localStorage.get(this.AUTHENTICATION_KEY, {}) ;
    return new UserToken(user as any);
  }

  get isAuthenticated(): boolean {
    return this.userDetail.isAuthenticated ;
  }

  get isSubscribed(): boolean {
    return this.userDetail.isSubscribed ;
  }
  get userName(): string {
    return this.userDetail.userName;
  }

  get phone(): string {
    return this.userDetail.phone;
  }

  get fullUserName(): string {
    return this.userDetail.fullUserName;
  }

  get email(): string {
    return this.userDetail.email;
  }

  get userID(): number {
    return this.userDetail.userId;
  }

  get userType(): number {
    return this.userDetail.userType;
  }

  get profilePicture(): number {
    return this.userDetail.profile;
  }

  get address(): string {
    return this.userDetail.address;
  }

  get userIP(): any {
    return this.userDetail.userIP;
  }

  get subscribedFrom(): any {
    return this.userDetail.subscribedFrom;
  }

  get subscribedTo(): any {
    return this.userDetail.subscribedTo;
  }


  login(username: string, password: string): any {
    return this.http.post<any>(environment.ICC_API + "login", { username, password });
  }

  logout(): any {
    this.getUserLoggedOut();
    this.clear();
    this.router.navigateByUrl("/login");
  }


  private clear(): void {
    this.localStorage.clear();
  }

  // isRoleExist(role: RoleType): boolean {
  //   const user = new UserToken(this.localStorage.get(this.AUTHENTICATION_KEY, {}));
  //   if (Array.isArray(user.validRolesForUser) && user.validRolesForUser.length > 0) {
  //     const index = user.validRolesForUser.findIndex(x => x === role.toString());
  //     return index > 0;
  //   }
  //   return false;
  // }

  getUserLoggedOut(): any {
    const userID = this.userDetail.userId;
    if (userID != null && userID != undefined) {
      return this.http.get<any>(environment.ICC_API + "UserProfile/logOut?userid=" + userID)
        .pipe(map(data => {
          return data;
        }));
    }
  }

  GetConfiguration(): any {
    return this.http.get<any>(environment.ICC_API + "authenticate/config");
  }


}
