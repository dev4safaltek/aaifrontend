import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SignUpService} from '../services/SignUpService/sign-up.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.css']
})
export class RedirectionComponent implements OnInit {

  constructor(private router: Router,private _signUpService:SignUpService,private route: ActivatedRoute) { }
  public userId :any;
  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    })
    this.activateUserAccount(this.userId);
  }
  //Method for newly register user redirect to login page--
  redirectToLogin(){
  this.router.navigate(['/login']);
  }
  //Activate User account (newly signup user)--
  activateUserAccount(userId:any){
    if(userId!=undefined){
    this._signUpService.ActivateUserAccountService(userId).subscribe((response:any)=>{
      if(response.statusCode =='200'){
        console.log(response.message);
       }
    })
   }
  }
}
