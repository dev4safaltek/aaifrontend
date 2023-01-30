import { Component, OnInit, Input, forwardRef, OnChanges, ViewChild } from "@angular/core";
import { FormComponents } from "../formComponents.component";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from "@angular/forms";
import { MatSelect } from "@angular/material/select";


export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
  providers: [SELECT_VALUE_ACCESSOR]
})
export class DropdownComponent extends FormComponents implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  requiredmessage?: string;
  @Input()
  options?: any[];
  onModelChange: any;
  onModelTouch: any;
  value: any = "";
  @Input()
  panel:any;
  @Input()
  control?: AbstractControl;
  @Input()
  placeholder?: string;
  @ViewChild(MatSelect) matSelect: MatSelect;

  @Input("value")

  set initialValue(value: any) {
    if (this.value.length === 0) {
      this.writeValue(value);
    }
  }

  constructor() {
    super();
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.disabled && this.control) {
      this.control.disable({ emitEvent: false });
    }
  }
  ngOnInit(): void {

  }
  writeValue(obj: any): void {
    if ((typeof (obj) === "string" || typeof (obj) === "number")) {
      this.value = obj.toString();
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
    this.value = event.value;
    this.change.emit(event);
  }
  changeValue(value: string): void {
    this.value=value;
    if (this.matSelect) {
      this.matSelect.value = this.value;
    }
  }
}


