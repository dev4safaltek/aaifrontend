import { Component, OnInit, forwardRef, Input, ChangeDetectionStrategy, OnChanges } from "@angular/core";
import { FormComponents } from "../formComponents.component";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true
};

@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.css"],
  providers: [TEXTAREA_VALUE_ACCESSOR]

})

export class TextareaComponent extends FormComponents implements OnInit, ControlValueAccessor, OnChanges {
  @Input()
  maxlengthmessage: string;
  @Input()
  type?: string;
  @Input()
  control?: AbstractControl;
  @Input()
  readonly: any;
  @Input()
  min?: string;
  @Input()
  max?: string;
  onModelChange: any;
  onModelTouch: any;
  constructor() {
    super();
  }

  ngOnInit(): void {

  }

  writeValue(obj: any): void {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.disabled && this.control) {
      this.control.disable({ emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouch = fn;
  }


}
