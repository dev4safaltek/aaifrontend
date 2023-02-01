import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from "../app/_guards/auth.guard";
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { ParentNavigatorComponent } from './Shared/parent-navigator/parent-navigator.component';
import { PagenotfoundComponent } from './PageNotFound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RedirectionComponent } from './auth/redirection/redirection.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {OverlayModule} from '@angular/cdk/overlay';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { NgxMaskModule,IConfig } from 'ngx-mask';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { NumberHelper } from './Utilities/contract/number-helper';
import { CustomPhoneFormatPipe } from "./Utilities/contract/custom-phone-format";
import { TextMaskModule } from 'angular2-text-mask';
import { MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { IdleTimeNotificationComponent} from './Shared/idle-time-notification/idle-time-notification.component';
import { ApplicationMasterComponent} from '../app/Platform/applicationmaster/applicationmaster.component';
import { DashboardComponent} from '../app/Platform/dashboard/dashboard.component'; 



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ParentNavigatorComponent,
    PagenotfoundComponent,
    SignUpComponent,
    RedirectionComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CustomPhoneFormatPipe,
    IdleTimeNotificationComponent,
    ApplicationMasterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OverlayModule,
    MaterialModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    AngularEditorModule,
    NgApexchartsModule,
    TextMaskModule,
    MatIconModule,
    NgbModule,
    DatePipe
    
  ],
  providers: [AuthGuard,CookieService, 
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    // ExcelService,
    // PDFDownloadService,
    // ExportToExcelService,
    // PaginationService,
    NumberHelper,
    CustomPhoneFormatPipe,
    // ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
