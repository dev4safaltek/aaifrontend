import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SignUpService} from '../services/SignUpService/sign-up.service';
import { Category} from '../models/Model'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonSuccessMessages } from '../../Utilities/common/CommonSuccessMessage';
import { CommonErrorMessages} from '../../Utilities/common/CommonErrorMessage';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/Shared/custom.validator';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 form: FormGroup;
 public CategorySection:boolean = true;
 public SignUpDetailSection:boolean = false;
 public selectedCategory:any;
 allCategoryList:Category[] =[];
 public successFlag:boolean = false;
 public PasswordMisMatch:boolean = false;
 public CategorySelectionFlag = false;
 public showPassword: boolean = false;
 public showConfirmPassword: boolean = false;
 SignUpForm!: FormGroup;
 loaderflag:boolean = false;
  constructor(private _signUpService:SignUpService,
     private router: Router,
     private _toasterService: ToastrService,
     private cookieService: CookieService,
     private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loaderflag = true;
    this.GetAllCategory();
    this.loaderflag = false;
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.form = this.formBuilder.group({
      Category : new FormControl("",Validators.required),
      FirstName: ["",[Validators.required, CustomValidators.noWhitespaceValidator]],
      LastName: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
      Email: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
      Phone: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
      UserName: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
      Password: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
      ConfirmPassword: ["", [Validators.required, CustomValidators.noWhitespaceValidator]],
      UserType: new FormControl(""),
      CheckTermCondition : new FormControl("",Validators.required),

    });
  }

  
    NextProcess(flagObj:any, event:any){  
    let selectedCategoryObj = this.form.controls["Category"].value;
    if(flagObj =='CategorySection'){
      if(selectedCategoryObj !=''){
      this.selectedCategory = selectedCategoryObj;
      this.CategorySection= false; 
      this.SignUpDetailSection = true;
      }
      else{
        this.form.controls["Category"].markAsTouched;
        this.CategorySelectionFlag = true;
        this.CategorySection= true; 
        this.SignUpDetailSection = false;
      }
    }
    else{this.CategorySection= true; 
      this.SignUpDetailSection = false;}
     }

    GetAllCategory(){
      this._signUpService.GetAllCategoryService().subscribe((cateGoryRes:any)=>{
       this.allCategoryList = cateGoryRes.data;
       this.allCategoryList.unshift({ TypeName: "Please Select", Id: "" });
      })
    } 

   checkIsValidPassword(){
    let password = this.form.controls["Password"].value;
    let confirmpassword = this.form.controls["ConfirmPassword"].value;
      if(password != confirmpassword){
        this._toasterService.toastrConfig.preventDuplicates = true;
        this._toasterService.error(CommonErrorMessages.PasswordMismatch, "", {
          timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
        });
        return;
        } 
    }

  //SignUp method(Registed new user)--
  SignUp(){
    debugger
    this.loaderflag = true;
    this.form.markAllAsTouched(); 
    if(this.form.valid){
      let password = this.form.controls["Password"].value;
      let confirmpassword = this.form.controls["ConfirmPassword"].value;  
      if(password != confirmpassword){
        this._toasterService.toastrConfig.preventDuplicates = true;
        this._toasterService.error(CommonErrorMessages.PasswordMismatch, "", {
          timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
        });
        this.loaderflag = false;
        this.PasswordMisMatch = true; 
        return;
       }
       const params ={ 
                  FirstName: this.form.controls["FirstName"].value,
                  LastName:  this.form.controls["LastName"].value,
                  Email: this.form.controls["Email"].value,
                  Phone: this.form.controls["Phone"].value,
                  UserName:this.form.controls["UserName"].value,
                  Password:this.form.controls["Password"].value,
                  UserType: parseInt(this.selectedCategory),
                 }
      this._signUpService.SignUpService(params).subscribe((response:any)=>{
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
        this.successFlag = true;
        this.loaderflag = false;
        this.router.navigate([('/RedirectToLogin')])       
        }
       }
    })
  }
  else{
    this.loaderflag = false;
    this._toasterService.toastrConfig.preventDuplicates = true;
    this._toasterService.error(CommonErrorMessages.FillMendatoryFields, "", {
      timeOut: 3000, positionClass: 'toast-top-right', closeButton: true
    });
    return;
   }
  }

  CheckcategoryFlag(){
    this.CategorySelectionFlag = false;
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
