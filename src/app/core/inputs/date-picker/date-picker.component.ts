import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormComponents } from "../formComponents.component";

export const DATE_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};
export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid
    ? null
    : {
      isValid: {
        valid: false,
      },
    };
};

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
  providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class DatePickerComponent extends FormComponents implements ControlValueAccessor, OnInit {

  @Input()
  requiredmessage?: string;
  @Input()
  control?: AbstractControl;
  @Input()
  placeholder?: string;
  picker: string;
  disabled?: boolean;
  @Input()
  readonly:boolean;
  @Input()
  maxDate:any;
  onModelChange: any;
  onModelTouch: any;
  value: any;
  @Input()
  max?: string;

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
  
  clearDate(): any {
    this.control.setValue(null);
  }

}
