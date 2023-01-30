import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
// import { AutomapperService } from "./automapper/automapper.service";
import { MessagingService } from "./messaging/messaging.service";
import { ToastrModule } from "ngx-toastr";
import { TextboxComponent } from "./inputs/textbox/textbox.component";
import { DropdownComponent } from "./inputs/dropdown/dropdown.component";
import { CheckboxComponent } from "./inputs/checkbox/checkbox.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../Shared/angular-material/angular-material.module";
import { DatePickerComponent } from "./inputs/date-picker/date-picker.component";
import { DropdownMultiSelectComponent } from "./inputs/dropdown-multi-select/dropdown-multi-select.component";
import { RadioButtonComponent } from "./inputs/radio-button/radio-button.component";
import { DateTimePickerComponent } from "./inputs/date-time-picker/date-time-picker.component";
//import { NgxMatDatetimePickerModule } from "ngx-mat-datetime-picker";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { TextareaComponent } from './inputs/textarea/textarea.component';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  declarations: [
    TextboxComponent,
    DropdownComponent,
    CheckboxComponent,
    DatePickerComponent,
    DateTimePickerComponent,
    DropdownMultiSelectComponent,
    RadioButtonComponent,
    DateTimePickerComponent,
    TextareaComponent
  ],
  providers: [
    MessageService,
    MessagingService,
  ],
  exports:
    [
      TextboxComponent,
      DropdownComponent,
      CheckboxComponent,
      DatePickerComponent,
      DateTimePickerComponent,
      DropdownMultiSelectComponent,
      RadioButtonComponent,
      TextareaComponent

    ],
})
export class CoreModule {
  constructor() {

  }
}
