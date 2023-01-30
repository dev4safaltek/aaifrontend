import { Component, OnInit ,forwardRef, Input, OnChanges} from "@angular/core";
import { FormComponents } from "../formComponents.component";
import { AbstractControl, ControlValueAccessor ,NG_VALUE_ACCESSOR} from "@angular/forms";

export const TEXTBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextboxComponent),
  multi: true
};

@Component({
  selector: "app-textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.scss"],
  providers: [TEXTBOX_VALUE_ACCESSOR]
})
export class TextboxComponent extends FormComponents implements OnInit,ControlValueAccessor,OnChanges {
  @Input()
  maxlengthmessage: string;
  @Input()
  control?: AbstractControl;
  @Input()
  requiredmessage?: string;
  @Input()
  placeholder?: string;
  @Input()
  type?: string;
  @Input()
  readonly:any;
  @Input()
  min?: string;
  @Input()
  max?: string;
  @Input()
  validemail?: string;
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
