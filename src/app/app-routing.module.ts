import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PagenotfoundComponent } from './PageNotFound/pagenotfound.component';
import { AuthenticationGuard } from './GuardService/authentication.guard';
import { RedirectionComponent } from './auth/redirection/redirection.component';
import { ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'SignUp',component:SignUpComponent},
  {path:'RedirectToLogin',component:RedirectionComponent},
  {path:'ForgotPassword', component:ForgotPasswordComponent},
  {path:'ResetPassword', component:ResetPasswordComponent},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }