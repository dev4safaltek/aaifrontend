import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PagenotfoundComponent } from './PageNotFound/pagenotfound.component';
import { AuthenticationGuard } from './GuardService/authentication.guard';
import { RedirectionComponent } from './auth/redirection/redirection.component';
import { ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ApplicationMasterComponent} from '../app/Platform/applicationmaster/applicationmaster.component';
import { DashboardComponent} from '../app/Platform/dashboard/dashboard.component';
import {AuthorizationComponent} from '../app/Platform/authorization/authorization.component';


const routes: Routes = [
  {path:'',redirectTo:'Login', pathMatch:'full'},
  {path:'Login',component:LoginComponent},
  {path:'SignUp',component:SignUpComponent},
  {path:'RedirectToLogin',component:RedirectionComponent},
  {path:'ForgotPassword', component:ForgotPasswordComponent},
  {path:'ResetPassword', component:ResetPasswordComponent},
  {path:'Dashboard',component:ApplicationMasterComponent,children:[
  {path:'',component:DashboardComponent},
  {path:'Authorization',component:AuthorizationComponent},
   ]},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
