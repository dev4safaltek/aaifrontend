import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { FormComponents } from "../formComponents.component";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const DATE_TIME_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true
};

@Component({
  selector: "app-date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.scss"],
  providers: [DATE_TIME_PICKER_VALUE_ACCESSOR]
})

export class DateTimePickerComponent extends FormComponents implements ControlValueAccessor, OnInit {

  @Input() picker: string;
  @Input() readonly:boolean;
  @Input() maxDate:any;
  onModelChange: any;
  onModelTouch: any;
  value: any;
  @Input() enableMeridian =  false; 
  @Input()
  control?: AbstractControl;
  

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
  writeValue(value: any): void {
    if (value instanceof Date || typeof value === "string") {
      this.value = value;
    } else {
      this.value = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event: any): any {
    this.change.emit();
  }

}
