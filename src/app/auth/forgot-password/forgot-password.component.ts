import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotPasswordService} from '../services/ForgotPasswordService/forgot-password.service';
import { CommonSuccessMessages} from '../../Utilities/common/CommonSuccessMessage';
import { CommonErrorMessages} from '../../Utilities/common/CommonErrorMessage';
import { ToastrService } from 'ngx-toastr';
import { SeverityType } from "../../core/messaging/severity-type.enum";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loaderflag:boolean = false;
  constructor(private _forgotpassword: ForgotPasswordService,
    private _toasterService: ToastrService) { }

   public CheckUserFlag:boolean = false;
   public ValidateEmailflag:boolean = false;
  ngOnInit(): void {
  }
  //Forgot password method --
  forgotPassword(dataObj:NgForm){
  this.loaderflag = true;
  if(dataObj.valid){
  this.ValidateEmailflag =false;
  let email = dataObj.value.email
  this._forgotpassword.ForgotPassword(email).subscribe((response:any)=>{
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
      this._toasterService.info(CommonSuccessMessages.PasswordResetLink, "", {
        timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
      });
      }
     }
 })
 }
else{
     this.loaderflag = false;  
     this.ValidateEmailflag =true;
    //  this._toasterService.toastrConfig.preventDuplicates = true; 
    //  this._toasterService.error(CommonErrorMessages.InvalidEmail, "", {
    //   timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
    // }); 
   }
  }
  CheckUniqueEmail(){
    // this.CheckUserFlag = false;
    this.ValidateEmailflag =false;
  }
}
