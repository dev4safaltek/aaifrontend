import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../services/LoginService/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonErrorMessages } from '../../Utilities/common/CommonErrorMessage';
import { LocalStorageService } from "../../core/storage/localstorage.service";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/Shared/custom.validator';
import { AuthService } from 'src/app/auth/auth.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public errorMsg: boolean = false;
  public rememberFlag: boolean = false;
  public showPassword: boolean = false;
  submitted!: boolean;
  loaderflag:boolean = false;
  returnUrl: string;
  userType:any;

  constructor(private router: Router, 
    private _LoginService: LoginService, 
    private cookieService: CookieService,
    private localStorage: LocalStorageService,
    private _toasterService: ToastrService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document) 
    { }

    // @HostListener("paste", ["$event"]) blockPaste(e: KeyboardEvent) {
    //   e.preventDefault();
    // }
  
    // @HostListener("copy", ["$event"]) blockCopy(e: KeyboardEvent) {
    //   e.preventDefault();
    // }
  
    // @HostListener("cut", ["$event"]) blockCut(e: KeyboardEvent) {
    //   e.preventDefault();
    // }

  ngOnInit(): void { 
    this.createFormGroup();
    if (this.authService.isAuthenticated) {
      this.userType = this.authService.userType
      if(this.userType==1){
      this.router.navigate(["/Dashboard"]);
      return;
      }
      // else if(this.userType==2){
      //   this.router.navigate(["/Dashboard/PatientDashboard"]);
      //   return;
      // }
   
    }
  }

  createFormGroup(): void {
    this.form = this.formBuilder.group({
      Username: ["",[Validators.required, CustomValidators.noWhitespaceValidator]],
      Password: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
    });
  }

  //Method for sign-Up component access from login page --
  SignUpControl() {
    this.router.navigate(['/SignUp'])
  }

  //Login Users methods
  Login(): void {
    this.loaderflag= true;
    this.errorMsg = false;
    if (this.form.valid) {
      const params = {
        Username: this.form.controls["Username"].value,
        Password: this.form.controls["Password"].value,
        RemmemberMe: false
      }
      this._LoginService.loginService(params).subscribe((res: any) => {
        if (res.data != null && res.data != undefined) {
         this.loaderflag= false; 
          this.localStorage.put(environment.AUTHENTICATION_KEY, res.data);
          if (res.data.userType == 1) {
            // It means Super Admin LogedIn --
            this.router.navigate(['/Dashboard']);
            return;
          }     
        }
        else { 
          this._toasterService.toastrConfig.preventDuplicates = true;
          this._toasterService.error(CommonErrorMessages.InvalidUsername, "", {
            timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
          });
          this.errorMsg = true;
          this.loaderflag= false;
          return;
         }
      })
    }
    else {
      this.submitted = true;
      this.loaderflag= false;
      this.errorMsg = true;
      return;
    }
  }
  //Forgot password method--
  ForgotPassword(dataObj: NgForm) {
    const params = {
      Username: dataObj.value.email,
      Action: dataObj.value.Action
    }
    this._LoginService.forgotPasswordService(dataObj).subscribe((response: any) => {
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
