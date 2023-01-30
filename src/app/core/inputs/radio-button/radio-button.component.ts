import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { FormComponents } from "../formComponents.component";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};

@Component({
  selector: "app-radio-button",
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.scss"],
  providers: [RADIO_VALUE_ACCESSOR]
})

export class RadioButtonComponent extends FormComponents implements OnInit, ControlValueAccessor {
  onModelChange: any;
  onModelTouch: any;
  checked: any;
  value= false;
  isIntialValueSet=false;
  @Input("value")
  
  labelPosition = "before";
  @Input()
  control?: AbstractControl;
  @Input()
  labelHeader?: string;

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
  onChange(event: any): void {
    this.checked = event.checked;
    if (this.onModelChange) {
      this.onModelChange(event.checked);
      this.onModelTouch();
    }

    this.change.emit(event);
  }
}

