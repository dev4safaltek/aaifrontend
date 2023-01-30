import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class CustomPhoneFormatPipe implements PipeTransform {
  oldValue :any="";
  count : any=0;

  transform(event:any) {
    let newVal;
    if(event!=null && event!="" && event!=undefined) 
    {
      newVal= event.replace(/\D/g, "");
    if (newVal.length === 0) {
      newVal = "";
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, "($1)");
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
    } else if (newVal.length <= 19) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2-$3");
    } else {
      newVal = newVal.substring(0, 19);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2-$3");
    }
    this.oldValue = newVal;
    return this.oldValue;
  }
}


}
