import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberDirective {

  constructor(
    private _el: ElementRef,
    private _toaser: ToastrService,
    private control: NgControl
  ){}

  @HostListener("input", ["$event"])onInputChange(event: any): void {
    const initalValue = this.control.value;
    const newValue = initalValue.replace(/[^0-9]*/g, "");
    if (initalValue !== newValue) {
      event.stopPropagation();
    }
  }

}