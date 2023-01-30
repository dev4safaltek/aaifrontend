import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ForgotPasswordService} from '../services/ForgotPasswordService/forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSuccessMessages} from '../../Utilities/common/CommonSuccessMessage';
import { CommonErrorMessages} from '../../Utilities/common/CommonErrorMessage';
import { ToastrService } from 'ngx-toastr';
import { SeverityType } from "../../core/messaging/severity-type.enum";
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidators } from 'src/app/Shared/custom.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  loaderflag:boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  constructor(
    private _forgotpassword: ForgotPasswordService, 
    private route: ActivatedRoute,
    private _toasterService: ToastrService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,) { }

  public userId :any;
  public Validatepasswordflag : boolean= false;

  ngOnInit(): void {
      this.createFormGroup();
      this.route.queryParams.subscribe(params => {
      this.userId =  params['userId'];
      this.userId = this.authService.userID;
    })
    
  }

  createFormGroup(): void {
    this.form = this.formBuilder.group({
      password: ["",[Validators.required, CustomValidators.noWhitespaceValidator]],
      confirmPassword: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
    });
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkIsValidPassword(){
      let password = this.form.controls["password"].value;
      let confirmpassword = this.form.controls["confirmPassword"].value;
      if(password != confirmpassword){
      this._toasterService.toastrConfig.preventDuplicates = true;
      this._toasterService.error(CommonErrorMessages.PasswordMismatch, "", {
        timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
      });
      return;
      } 
  }

  //Reset password method --
  resetPassword(){
    this.loaderflag = true;
    this.form.markAllAsTouched();
    if(this.form.valid){
      let password = this.form.controls["password"].value;
      let confirmpassword = this.form.controls["confirmPassword"].value;
      if(password== confirmpassword){
      const params ={
      UserId: this.userId,
      Password: this.form.controls["password"].value,
      ConfirmPassword:this.form.controls["confirmPassword"].value
    } 
      this._forgotpassword.ResetPassword(params).subscribe((response:any)=>{
        if(response.statusCode =='200'){
          if(response.message!="")
          {
            this.loaderflag = false;
            this._toasterService.toastrConfig.preventDuplicates = true;
            this._toasterService.error(response.message, "", {
              timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
            });
            return;
          }
          else{
          this.loaderflag = false;  
          this._toasterService.toastrConfig.preventDuplicates = true;  
          this._toasterService.success(CommonSuccessMessages.SuccessResetPassword, "", {
            timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
          });
          localStorage.clear();
          this.router.navigate(["/login"]);  
          }
         }
    })
   }
   else{
    this.loaderflag = false;
    this.Validatepasswordflag = true;
    this._toasterService.error(CommonErrorMessages.PasswordMismatch, "", {
      timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
    });
   }
  }
  else{
    this.loaderflag = false;
  }
}
}
