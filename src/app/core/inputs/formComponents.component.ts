// import { isFakeMousedownFromScreenReader } from "@angular/cdk/a11y";
import { Input, Output, EventEmitter, Directive } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";

@Directive()
export class FormComponents {
  @Input()
  id?: string;
  @Input()
  control?: AbstractControl = null;
  @Input()
  hidden?: boolean;
  @Input()
  disabled?: boolean;
  @Input()
  formgroup: FormGroup;
  @Input()
  placeholder?: string;
  @Input()
  requiredmessage?: string;
  @Input()
  validemail?: string;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  minmessage: string;
  @Input()
  maxmessage: string;
  @Input()
  maxlengthmessage: string;
  @Input()
  minlengthmessage: string;
  validate(): string {
    if (!this.control) {
      return "";
    }
    if (this.control.invalid && this.control.touched) { 
      for (const error in this.control.errors) {  
      
        if (error === "required") {
          return this.requiredmessage ? this.requiredmessage : "This field is required.";
        } else if (error === "minlength") {
          return this.minlengthmessage? this.minlengthmessage:"Min length error";
        } else if (error === "maxlength") {
          return this.maxlengthmessage ? this.maxlengthmessage : "Max length error";
        } else if (error === "pattern") {
          return "Enter valid value.";
        } else if (error === "min") {
          return this.minmessage ? this.minmessage : "Enter valid minimum value.";
        } else if (error === "max") {
          return this.maxmessage ? this.maxmessage : "Enter valid max value.";
        } else if (error === "matDatepickerParse") {
          return "Enter valid date (e.g. MM/DD/YYYY)";
        } else if (error === "invalidDate") {
          return "Enter valid date (e.g. MM/DD/YYYY)";
        } else if (error ==="whitespace") {
          return "Enter valid value";
        } else if (error === "ip") {
          return "Enter valid ip address";
        } else if (error === "invalidUrl") {
          return "Enter valid url";
        }
       
        else if (error == "email") {
          return this.validemail ? this.validemail : "Enter valid email.";
        } 
      }
    }
    
  }
}
