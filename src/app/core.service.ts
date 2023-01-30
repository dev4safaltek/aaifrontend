import { DatePipe } from "@angular/common";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
// import base64 from "base-64";
// import { Observable } from "rxjs";
// import { map } from "rxjs/operators";
// import utf8 from "utf8";
import { environment } from "../environments/environment";
import { DefaultNumber} from "../app/Shared/Enums/Default.enums";


@Injectable()
export class CoreService {
    private datePipe = new DatePipe("en-us");
    private _httpClient: HttpClient;
    constructor(
        private _http: HttpClient,
        private handler: HttpBackend
    ) {
        this._httpClient = new HttpClient(handler); // ToExclude headers using interceptor.
    }


    getIpAddress(): any {
        return this._httpClient.get("http://api.ipify.org/?format=json");
    }

    formatDateString(date: any): any {
        if(date!=""){
        const dateValue = new Date(date);   
        return (dateValue.getMonth() + 1) + "/" + dateValue.getDate() + "/" + dateValue.getFullYear(); 
        }
        else{
            return "";
        }
      }

    // function is used to encrypt value 
    // encryptValue(value: any, isEncrypt: boolean = true): any {
    //     let response: any;
    //     if (value !== null && value !== "") {
    //         let bytes: any;
    //         if (isEncrypt) {
    //             bytes = utf8.encode(value.toString());
    //             response = base64.encode(bytes);
    //         } else {
    //             bytes = base64.decode(value);
    //             response = utf8.decode(bytes);
    //         }
    //     }
    //     return response;
    // }

    // function is used to encode query string
    // encodeQueryString(userId: number, date: string, object: { [key: string]: string | number | boolean }): { q: string } {
    //     if (object) {
    //         const obj = { userId, date, ...object };
    //         return {
    //             q: encodeURIComponent(this.encryptValue(JSON.stringify(obj)))
    //         };
    //     } else {
    //         return {
    //             q: encodeURIComponent(this.encryptValue(JSON.stringify({ userId, date })))
    //         };
    //     }
    // }

    // // function is used to decode query string 
    // decodeQueryString(activatedRoute: ActivatedRoute): Observable<any> {
    //     return activatedRoute.queryParams.pipe(
    //         map((data:any) => {
    //             if (data.q) {
    //                 return JSON.parse(this.encryptValue(decodeURIComponent(data.q), false));
    //             } else {
    //                 return {};
    //             }
    //         })
    //     );
    // }

    getDateOfService(dos: string): string {
        if (dos === undefined || dos === null || dos === "0") {
            return new Date().toISOString();
        } else {
            return dos.split("~")[0];
        }
    }

    getEncounterIdByDateOfService(dos: string): string {
        if (dos === undefined || dos === null || dos === "0") {
            return "0";
        } else {
            return dos.split("~")[1];
        }
    }

    makeStringFormGroupValues(value: any): any {
        if (value !== null && typeof (value) === "object") {
            Object.keys(value).forEach(key => {
                if (typeof (value[key]) === "string") {
                    value[key] = value[key];
                } else if (typeof (value[key]) === "number") {
                    value[key] = value[key];
                }
            });
        } else {

        }
    }

    downloadFile(data: any, tag: HTMLAnchorElement, filename: string): void {
        const blobUrl = URL.createObjectURL(data);
        tag.href = blobUrl;
        tag.setAttribute("download", filename);
        tag.click();
    }

    openUploadFile(data: any, tag: HTMLAnchorElement, filename: string): void {
        const blobUrl = URL.createObjectURL(data);
        // tag.setAttribute("download", filename);
        // window.open(blobUrl);
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    }


    getFormattedPhoneNumber(value: string): string {
        return "";
    }

    stringIsNumber(strString: string): boolean {
        if (!strString) {
            return false;
        }
        if (strString.length === 0) {
            return false;
        }
        const strValidChars = "0123456789.";
        let strChar;
        let count = 0;
        let blnResult = true;


        for (let i = 0; i < strString.length && blnResult === true; i++) {
            strChar = strString.charAt(i);

            if (strChar === ".") {
                count++;
                if (count > 1) {
                    blnResult = false;
                    return blnResult;
                }
            }
            if (strValidChars.indexOf(strChar) === -1) {
                blnResult = false;
            }
        }
        return blnResult;
    }
    isString(input: any): boolean {
        return typeof input === "string" || (typeof input === "object" && input.constructor === String);
    }
    isNumber(input: any): boolean {
        return typeof input === "string" || (typeof input === "object" && input.constructor === Number);
    }
    isArray(input: any): boolean {
        return typeof input === "object" && input.constructor === Array;
    }
    isBoolean(input: any): boolean {
        return typeof input === "string" || (typeof input === "object" && input.constructor === Boolean);
    }

    checkNewFormularyTypes = (commaSeperatedFormularyTypes: string, requiredFormularyType: number): boolean => {
        let isACIDispensingFormulary = false;
        if (commaSeperatedFormularyTypes !== null && commaSeperatedFormularyTypes !== "") {
            const formularyArr: String[] = commaSeperatedFormularyTypes.split(",");
            if (formularyArr.length > DefaultNumber.Zero) {
                if (formularyArr.includes(requiredFormularyType.toString())) {
                    isACIDispensingFormulary = true;
                }
            }
        }

        return isACIDispensingFormulary;
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }

      faxNumberKeyUp(event:any):void{
		const keyCode = event.keyCode;  
		if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 	  
  }

    
      
      addNumberKeyUp(event:any):void{
		const keyCode = event.keyCode;  
		if (( (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) && event.keyCode !=8) {
			event.preventDefault();
		} 	  
  }

    
}
