import { Component, OnInit, Input, forwardRef, AfterViewInit, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { FormComponents } from "../formComponents.component";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from "@angular/forms";
import { MatSelect, MatSelectChange } from "@angular/material/select";


export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownMultiSelectComponent),
  multi: true
};

@Component({
  selector: "app-dropdown-multi-select",
  templateUrl: "./dropdown-multi-select.component.html",
  styleUrls: ["./dropdown-multi-select.component.scss"],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers: [SELECT_VALUE_ACCESSOR]
})
export class DropdownMultiSelectComponent extends FormComponents implements OnInit, AfterViewInit, ControlValueAccessor {

  ElementRef: HTMLInputElement;
  @ViewChild(MatSelect) matSelect: MatSelect;
  @Input()
  requiredmessage?: string;
  @Input()
  options?: any[];
  @Input()
  placeholder?: string;
  @Input()
  control?: AbstractControl;
  previousSelectedValues: any[];
  filterText = "";
  get getOptions(): any {
    if (Array.isArray(this.options) && Array.length > 0 && this.filterText.length > 0) {
      return this.options.filter(x => x.label.toLowerCase().indexOf(this.filterText.toLocaleLowerCase()) > -1);
    }
    return this.options;
  }
  onModelChange: any;
  onModelTouch: any;
  value: any = "";
  @Input()
  allowsearch: boolean;
  @Input("value")
  set initialValue(value: any) {
    if (this.value.length === 0) {
      this.writeValue(value);
    }
  }

  constructor() {
    super();

  }
  ngOnInit(): void {

  }
  writeValue(obj: any): void {
    if (typeof (obj) === "string" || typeof (obj) === "number") {
      this.value = obj.toString();
    } else if (Array.isArray(obj)) {
      this.value=obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled=isDisabled;
  }
  onChange(event: any): void {
    this.value = event.value;
    if (this.onModelChange) {
      this.onModelChange(event.value);
    }

    this.change.emit(event);
  }
  setFilterText(value: string): void {
    this.filterText = value;
  }
  resetFilter(): void {
    this.filterText = "";
  }
  ngAfterViewInit(): void {
    this.matSelect.valueChange
      .subscribe((values) => {
        if (this.matSelect.multiple && this.allowsearch) {
          let restoreSelectedValues = false;
          if (this.filterText && this.filterText.length
            && this.previousSelectedValues && Array.isArray(this.previousSelectedValues)) {
            if (!values || !Array.isArray(values)) {
              values = [];
            }
            const optionValues = this.matSelect.options.map(option => option.value);
            this.previousSelectedValues.forEach(previousValue => {
              if (values.indexOf(previousValue) === -1 && optionValues.indexOf(previousValue) === -1) {
                // if a value that was selected before is deselected and not found in the options, it was deselected
                // due to the filtering, so we restore it.
                values.push(previousValue);
                restoreSelectedValues = true;
              }
            });
          }

          if (restoreSelectedValues) {
            this.matSelect.selectionChange.emit(new MatSelectChange(this.matSelect, values));
          }
          this.previousSelectedValues = values;
        }
      });
  }
}


