import { Component, OnInit, forwardRef, Input, ViewChild } from "@angular/core";
import { FormComponents } from "../formComponents.component";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";


export const CHECK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  providers: [CHECK_VALUE_ACCESSOR]
})
export class CheckboxComponent extends FormComponents implements OnInit, ControlValueAccessor {
  @Input()
  control?: AbstractControl;
  @Input()
  placeholder?: string;
  onModelChange: any;
  onModelTouch: any;
  checked: any;
  value= false;
  isIntialValueSet=false;
  @Input("value")

  set initialValue(value: any) {
    if (this.isIntialValueSet===false) {
      this.isIntialValueSet=true;
      this.writeValue(value);
    }
  }
  @ViewChild(MatCheckbox) matcheckBox: MatCheckbox;
  constructor() {
    super();
  }
  ngOnInit(): void {
  }
  writeValue(obj: any): void {
    if (obj === true) {
      this.checked = true;
    } else {
      this.checked = false;
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
  onChange(event: any): void {
    this.checked = event.checked;
    if (this.onModelChange) {
      this.onModelChange(event.checked);
      this.onModelTouch();
    }

    this.change.emit(event);
  }
}

