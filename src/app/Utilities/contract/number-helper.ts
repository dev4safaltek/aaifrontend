import { DefaultNumbers } from "./default-numbers.enum";

export class NumberHelper {
  static isAvailable(value: number): boolean {
    if (typeof value !== "number") {
      return false;
    }

    const isNaN = this.isNaN(value);
    const isInfinity = this.isInfinity(value);
    return !isNaN && !isInfinity;
  }

  static isInfinity(value: number): boolean {
    const isInifinity = value === Infinity;
    const isPositiveInfinity = value === +Infinity;
    const isNegativeInfinity = value === -Infinity;
    return isInifinity || isPositiveInfinity || isNegativeInfinity;
  }

  static isNaN(value: number): boolean {
    return value !== value;
  }

  static isGreaterThan(
    value: number,
    minValue: number,
    inclusion: any = false
  ): boolean {
    if (!this.isAvailable(value)) {
      return false;
    }

    const result = inclusion ? value >= minValue : value > minValue;
    return result;
  }

  keyPressNumbers(event:any): boolean {
    let e = <KeyboardEvent> event;
    var charCode = event.which ? event.which : event.keyCode;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
    // Allow: Ctrl+A
    (charCode == 65 && e.ctrlKey === true) ||
    // Allow: Ctrl+C
    (charCode == 67 && e.ctrlKey === true) ||
    // Allow: Ctrl+V
    (charCode == 86 && e.ctrlKey === true) ||
    // Allow: Ctrl+X
    (charCode == 88 && e.ctrlKey === true) ||
    // Allow: home, end, left, right
    (charCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return true;
    }
    if(charCode === 8){
      return true;}
    else if (charCode < 45 || charCode > 57 &&  charCode < 96 || charCode > 105) {
      event.preventDefault();
      return false;     
    } else if(charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    else {
      return true;
    }
  }

  keyPressSearch(event:any): boolean {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode == 13) {
      return false;
    } else {
      return true;
    }
  }

  //Compare shorting
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  static calculatePercentageOnly(total: number, achieved: number) {
    let pecentage =
      achieved > 0 && total > 0 ? Math.round((achieved * 100) / total) : 0;
    return pecentage.toFixed(2) + "%";
  }

  static ConvertMinstoPercentage(hours: number, minutes: number) {
    let newtime = "";
    let newminutes = 0;
    if (minutes >= 0 && minutes <= 7) {
      newminutes = 0;
    } else if (minutes > 7 && minutes <= 22) {
      newminutes = 15;
    } else if (minutes > 22 && minutes <= 37) {
      newminutes = 30;
    } else if (minutes > 37 && minutes <= 52) {
      newminutes = 45;
    } else if (minutes > 52) {
      hours = hours + 1;
      newminutes = 0;
    }
    let timeCalc = (newminutes / DefaultNumbers.Sixty) * 100;
    newtime = hours.toString() + "." + timeCalc.toLocaleString("0:0");
    return newtime;
  }

  static curentDate() {
    return new Date();
  }

  static dayOfWeek() {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  }

  keyPressAlphanumeric(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  validateEmail(event:any) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(event.target.value).toLowerCase());
   }
}
